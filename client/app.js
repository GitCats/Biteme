var $ = require('jquery');
// var Modal = require('react-modal');
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;

//require all of the module exports here
var App = require('./views/main.jsx');
var AllDeals = require('./views/allDeals.jsx');
var OwnerProfile = require('./views/ownerProfile.jsx');
var Map = require('./views/map.jsx');

//top level route will always be in view -- acts as a shell so needs a 
//this.props.children where the other views will be switched in and out
//indexroute is the default view - what you'd see if you just went to that URL
ReactDOM.render((
  <Router>
    <Route path="/" component={App}>  //will always be in view
      <IndexRoute component={AllDeals} /> //the default view that can be switched out
      <Route path="ownerprofile" component={OwnerProfile} />
    </Route>
  </Router>
),
document.getElementById('app'));
