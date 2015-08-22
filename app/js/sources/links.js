'use strict';

import api from '../api';
import LinksActions from '../actions/links';

export default {
  getLinks: {
    // remotely fetch something (required)
    remote(state, obj) {
      return api.Links.all(obj);
    },
    success: LinksActions.getLinksSuccess, // (required)
    error: LinksActions.getLinksFailed, // (required)
  },

  createLink: {
    remote(state, body) {
      return api.Links.create(body);
    },
    success: LinksActions.createLinkSuccess, // (required)
    error: LinksActions.createLinkFailed, // (required)
  },

  destroyLink: {
    remote(state, index) {
      return Promise.all([index, api.Links.destroy(state.links[index].shortLink)]);
    },
    success: LinksActions.destroyLinkSuccess, // (required)
    error: LinksActions.destroyLinkFailed, // (required)
  },
};
