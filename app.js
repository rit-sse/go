var express = require('express');
var api = require('sse-api-client');
var path = require('path');
var config = require('./config.json');

var app = express();
var Links = new api(config.apiRoot.Links);

app.use(express.static('dist'));

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/:linkId', function(req, res, next){
  Links.all({ go_link: req.params.linkId}, function(err, r){
    if(err || r.total_results === 0) {
      res.redirect('/?error=true')
    } else {
      res.redirect(r.data.expanded_link)
    }
  });
});

module.exports = app;