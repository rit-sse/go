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
    this.linkData = { data: [] };
    this.status = null;

    this.registerAsync(AuthSource);
    this.registerAsync(LinksSource);

    this.bindActions(AuthActions);
    this.bindActions(LinksActions);
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
    this.setStatus({ message: 'Signed in successfully' });
    this.loggedIn = true;
  }

  onSignInFailed(err) {
    this.setError(err);
    this.loggedIn = false;
  }

  onSignOutSuccess() {
    this.setStatus({ message: 'Signed out successfully' });
    this.loggedIn = false;
  }

  onGetLinksSuccess(payload) {
    this.linkData = payload;
    this.status = null;
    this.err = null;
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
      this.linkData.data.unshift(payload);
    }
    this.setStatus({ message: 'Successfully created a go link' });
  }

  onCreateLinkFailed(err ) {
    this.setError(err);
  }

  onDestroyLinkSuccess(payload) {
    this.linkData.data.splice(payload[0], 1);
    this.linkData.total--;
    this.setStatus({ message: 'Successfully deleted a go link' });
  }

  onDestroyLinkFailed(err) {
    this.setError(err);
  }
}

export default alt.createStore(SSEStore, 'SSEStore');
