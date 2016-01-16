var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route
var IndexRoute = require('react-router').IndexRoute 
var Link = require('react-router').Link
var $ = require('jquery');

var Main = require('./views/main.jsx');
var Test = require('./views/testingRoutes.jsx');


ReactDOM.render((
  <Router>
    <Route path="/" component={Main}>  //Will always be in view
      {/* <IndexRoute component={something...}> //The default view that can be switched out */}
      <Route path="testView" component={Test} />

    </Route>
  </Router>
),

document.getElementById('app'));
