'use strict';

import api from '../api';
import AuthActions from '../actions/auth';

export default {
  signIn: {
    // remotely fetch something (required)
    remote(state, id, token) {
      return api.Officers.all({ active: true })
        .then(officers => {
          if (officers.indexOf(id) !== -1) {
            return api.Auth.getToken('google', id, token);
          }
          return Promise.reject({ message: 'Need to be an officer to log in' });
        });
    },
    success: AuthActions.signInSuccess, // (required)
    error: AuthActions.signInFailed, // (required)
  },
};
