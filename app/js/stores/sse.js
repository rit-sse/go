'use strict';

import alt from '../alt';
import AuthActions from '../actions/auth';
import AuthSource from '../sources/auth';
import LinksActions from '../actions/links';
import LinksSource from '../sources/links';

class SSEStore {
  constructor() {
    this.loggedIn = false;
    this.err = null;
    this.linkData = [];
    this.status = null;

    this.registerAsync(AuthSource);
    this.registerAsync(LinksSource);

    this.bindListeners({
      onSignInSuccess: AuthActions.SIGN_IN_SUCCESS,
      onSignInFailed: AuthActions.SIGN_IN_FAILED,
      onGetLinksSuccess: LinksActions.GET_LINKS_SUCCESS,
      onGetLinksFailed: LinksActions.GET_LINKS_FAILED,
      onCreateLinkSuccess: LinksActions.CREATE_LINK_SUCCESS,
      onCreateLinkFailed: LinksActions.CREATE_LINK_FAILED,
      onDestroyLinkSuccess: LinksActions.DESTROY_LINK_SUCCESS,
      onDestroyLinkFailed: LinksActions.DESTROY_LINK_FAILED,
    });
  }

  setError(err) {
    this.err = err;
    this.status = null;
  }

  setStatus(status) {
    this.err = null;
    this.status = status;
  }

  onSignInSuccess() {
    this.err = null;
    this.loggedIn = true;
  }

  onSignInFailed(err) {
    this.err = err;
    this.loggedIn = false;
  }

  onGetLinksSuccess(payload) {
    this.links = payload;
    this.status = null;
  }

  onGetLinksFailed(err) {
    if ( err.message === 'Unauthorized' ) {
      this.setError({ message: 'Token expired. Try logging in again.' });
      this.loggedIn = false;
    } else {
      this.setError(err);
    }
  }

  onCreateLinkSuccess(payload) {
    if (parseInt(this.linkData.currentPage, 10) === 1) {
      this.linkData.data.unShift(payload);
    }
    this.setStatus({ message: 'Successfully created a go link' });
  }

  onCreateLinkFailed(err ) {
    this.setError(err);
  }

  onDestroyLinkSuccess(payload) {
    this.linkData.data.splice(payload[0], 1);
    this.setStatus({ message: 'Successfully deleted a go link' });
  }

  onDestroyLinkFailed(err) {
    this.setError(err);
  }
}

export default alt.createStore(SSEStore, 'SSEStore');
