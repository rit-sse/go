'use strict';

import API from 'sse-api-client';
import config from '../../config.json';

export default new API(config.apiRoot);
