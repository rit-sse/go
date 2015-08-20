'use strict';

import express from 'express';
import API from 'sse-api-client';
import path from 'path';
import config from './config.json';

const app = express();
const Links = new API(config.apiRoot).Links;

app.use(express.static('dist'));

app.get('/go', (req, res)  => res.sendFile(path.join(__dirname, 'views', 'index.html')));

app.get('/go/:linkId', (req, res) => {
  return Links
    .one(req.params.linkId)
    .then( r => res.redirect(r.longLink))
    .catch( () => res.redirect('/go?error=true'));
});

export default app;
