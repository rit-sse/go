'use strict';

import alt from '../alt';
import AuthActions from '../actions/auth';
import AuthSource from '../sources/auth';

class SSEStore {
  constructor() {
    this.loggedIn = false;
    this.err = null;
    this.links = [];

    this.registerAsync(AuthSource);

    this.bindListeners({
      onSignInSuccess: AuthActions.SIGN_IN_SUCCESS,
      onSignInFailed: AuthActions.SIGN_IN_FAILED,
    });
  }

  onSignInSuccess() {
    this.err = null;
    this.loggedIn = true;
  }

  onSignInFailed(err) {
    this.err = err;
    this.loggedIn = false;
  }
}

export default alt.createStore(SSEStore, 'SSEStore');
