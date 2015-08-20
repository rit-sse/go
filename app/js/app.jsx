var React = require('react');
var flux = require('./flux');

var GoApp = require('./components/app');
var routes = require('./routes');

React.render(<GoApp flux={flux} />, document.getElementById('app'));