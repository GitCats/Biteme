//might not need all of these - only $ react, reactdom, auth, link from SO
// var $ = require('jquery');
// var React = require('react');
// var ReactDOM = require('react-dom');
// var Router = require('react-router').Router;
// var Route = require('react-router').Route;
// var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link
var Signup = require('./auth.jsx').signup;
var Login = require('./auth.jsx').login;
var OwnerSignup = require('./auth.jsx').ownerSignup;
var OwnerLogin = require('./auth.jsx').ownerLogin;


var App = React.createClass({
  render: function() {
    return (
      <div className="logoDiv">
        <Link to="ownerprofile"><img src="client/assets/blueplate.png" className="bluePlateLogo" /></Link>
        <div className="auth">Care to filter by preferences? Click <Signup /> or <Login /> for this cool feature!</div>
        <span className="ownerAuth">Are you a <strong>restaurant owner</strong> with deals to offer? Click <OwnerSignup /> to sign up to list them, or <OwnerLogin /> if you already have an account.</span>
        {this.props.children}
      </div>
    );
  }
});


module.exports = App;
