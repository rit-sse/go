'use strict';

import api from '../api';
import AuthActions from '../actions/auth';

export default {
  signIn: {
    remote(state, googleUser) {
      const info = {
        token: googleUser.getAuthResponse().id_token,
        id: googleUser.getBasicProfile().getEmail().split('@')[0],
      };
      return Promise.all([info, api.Officers.all({ active: new Date() }, true)])
        .then(data => {
          const officers = data[1];
          if (officers.map(o => o.userDce).indexOf(data[0].id) !== -1) {
            return api.Auth.getToken('google', data[0].id,  data[0].token);
          }
          return Promise.reject({ message: 'Need to be an officer to log in' });
        });
    },
    success: AuthActions.signInSuccess,
    error: AuthActions.signInFailed,
  },

  signOut: {
    remote() {
      return Promise.all([api.Auth.signOut(), gapi.auth2.getAuthInstance().signOut()]);
    },
    success: AuthActions.signOutSuccess,
    error: AuthActions.signOutFailed,
  },
};
