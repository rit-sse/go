'use strict';

import express from 'express';
import API from 'sse-api-client';
import path from 'path';

const app = express();
const Links = new API(process.env.API_ROOT).Links;

app.use('/go', express.static('dist'));

app.get('/go', (req, res)  => res.sendFile(path.join(__dirname, 'views', 'index.html')));

app.get('/go/:linkId', (req, res) => {
  return Links
    .one(req.params.linkId)
    .then( r => res.redirect(r.longLink))
    .catch( () => res.redirect('/go?error=true'));
});

export default app;
