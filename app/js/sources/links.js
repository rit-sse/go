import api from '../api';
import LinksActions from '../actions/links';
import querystring from 'querystring';

export default {
  getLinks: {
    remote() {
      const query = querystring.parse(location.search.replace('?', ''));
      const obj = {};
      if (!isNaN(query.perPage)) {
        obj.perPage = query.perPage;
      }

      if (!isNaN(query.page)) {
        obj.page = query.page;
      }
      return api.Links.all(obj);
    },
    success: LinksActions.getLinksSuccess,
    error: LinksActions.getLinksFailed,
  },

  createLink: {
    remote(state, body) {
      return api.Links.create(body);
    },
    success: LinksActions.createLinkSuccess,
    error: LinksActions.createLinkFailed,
  },

  destroyLink: {
    remote(state, index) {
      return Promise.all([index, api.Links.destroy(state.linkData.data[index].shortLink)]);
    },
    success: LinksActions.destroyLinkSuccess,
    error: LinksActions.destroyLinkFailed,
  },
};
