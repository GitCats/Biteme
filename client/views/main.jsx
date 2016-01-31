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
       

     <nav class="navbar navbar-default navbar-static-top">
          <div class="container">

            <div id="navbar" class="navbar-collapse collapse">
              <ul class="nav navbar-nav">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/'>Sign Up</Link></li>
                <li><Link to='/'>Log In</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        <IndexLink to='/'><img src="client/assets/blueplate.png" className="bluePlateLogo" /></IndexLink>
        <div className="auth ">Care to filter by preferences? <Signup /> or <Login /> </div>
        <div className="ownerAuth">Restaurant Owner? <OwnerSignup /> or <OwnerLogin /></div>
        {this.props.children}
      </div>
    );
  }
});


module.exports = App;
