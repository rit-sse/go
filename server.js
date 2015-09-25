'use strict';

import express from 'express';
import API from 'sse-api-client';
import path from 'path';

const app = express();
const Links = new API(process.env.API_ROOT).Links;

app.use('/go', express.static('dist'));

app.get('/go', (req, res)  => res.sendFile(path.join(__dirname, 'dist', 'index.html')));

app.get('/go/:linkId', (req, res) => {
  return Links
    .one(req.params.linkId)
    .then( r => res.redirect(r.longLink))
    .catch( err => {
      console.log(err);
      res.redirect(`/go?error=${req.params.linkId}`);
    });
});

export default app;
