'use strict';

import api from '../api';
import LinksActions from '../actions/links';
import queryString from 'querystring';

export default {
  getLinks: {
    // remotely fetch something (required)
    remote() {
      const query = queryString.parse(location.search);
      const obj = {};
      if (!isNaN(query.perPage)) {
        obj.perPage = query.perPage;
      }

      if (!isNaN(query.page)) {
        obj.page = query.page;
      }
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
