var IndexLink = require('react-router').IndexLink;
var Signup = require('./auth.jsx').signup;
var Login = require('./auth.jsx').login;
var OwnerSignup = require('./auth.jsx').ownerSignup;
var OwnerLogin = require('./auth.jsx').ownerLogin;
var Link = require('react-router').Link


var App = React.createClass({
  render: function() {
    return (
      <div className="logoDiv">
      {/*ADD CONDITIONAL STATEMENT HERE THAT CHECKS FOR LOGIN STATUS TO DISPLAY THE NEXT 2 LINES*/}
      {/*IF localStorage.getItem("user" or "token"), IT SHOULD DISPLAY LINK TO USER PREFS PAGE*/}
        {/*IF localStorage.getItem("restaurant_id"), IT SHOULD ALSO DISPLAY LINK TO OWNERPROFILE*/}
        <div className="auth">Care to filter by preferences? <Signup /> or <Login /></div>
        <div className="ownerAuth"><p className="text">Restaurant Owner? <OwnerSignup /> or <OwnerLogin /></p></div>
        <IndexLink to='/'><img src="client/assets/banner.jpg" className="bluePlateLogo" /></IndexLink>
        {this.props.children}
      </div>
    );
  }
});


module.exports = App;
