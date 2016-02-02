var React = require('react');
var IndexLink = require('react-router').IndexLink;
var Link = require('react-router').Link;
var Auth = require('./auth.jsx').auth;


var App = React.createClass({

  componentWillMount: function() {
    //If not logged in:
    if (!localStorage.getItem("token")) {
      this.setState({ userAuth: true, ownerAuth: true, userLink: false, ownerLink: false, logoutLink: false });
    //If logged in as a user:
    } else if (localStorage.getItem("token") && !localStorage.getItem("restaurant_id")) {
      this.setState({ userAuth: false, ownerAuth: false, logoutLink: true });
      if (!localStorage.getItem("dontShowUserLink")) {
        this.setState({ userLink: true, ownerLink: false });
      }
    //If logged in as an owner:
    } else {
      this.setState({ userAuth: false, ownerAuth: false, logoutLink: true });
      if (!localStorage.getItem("dontShowOwnerLink")) {
        this.setState({ userLink: false, ownerLink: true });
      }
    }
  },

  getInitialState: function() {
    var userAuthUpdate = function() {
      this.setState({ userAuth: false, ownerAuth: false, userLink: false, logoutLink: true });
    };
    var ownerAuthUpdate = function() {
      this.setState({ userAuth: false, ownerAuth: false, ownerLink: false, logoutLink: true });
    };
    var logoutUpdate = function() {
      this.setState({ userAuth: true, ownerAuth: true, userLink: false, ownerLink: false, logoutLink: false });
    };
    var boundUserAuthUpdate = userAuthUpdate.bind(this);
    var boundOwnerAuthUpdate = ownerAuthUpdate.bind(this);
    var boundLogoutUpdate = logoutUpdate.bind(this);
    return { 
      setUserAuthState: boundUserAuthUpdate,
      setOwnerAuthState: boundOwnerAuthUpdate,
      setLogoutUpdate: boundLogoutUpdate
    }
  },

  navToHome: function() {
    if (localStorage.getItem("token") && !localStorage.getItem("restaurant_id")) {
      this.setState({ userLink: true, ownerLink: false });
      localStorage.setItem("dontShowUserLink", false);
    } else if (localStorage.getItem("token") && localStorage.getItem("restaurant_id")) {
      this.setState({ ownerLink: true, userLink: false });
      localStorage.setItem("dontShowOwnerLink", false);
    }
  },

  undoLink: function() {
    if (localStorage.getItem("token") && !localStorage.getItem("restaurant_id")) {
      this.setState({ userLink: false });
    } else {
      this.setState({ ownerLink: false });
    }
  },

  render: function() {
    return (
      <div className='logoDiv'>
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
        <br/>
        <div id='auth'>
          <Auth  userAuth={this.state.userAuth} 
                 setUserAuthState={this.state.setUserAuthState}
                 ownerAuth={this.state.ownerAuth}
                 setOwnerAuthState={this.state.setOwnerAuthState}
                 userLink={this.state.userLink}
                 ownerLink={this.state.ownerLink}
                 logoutLink={this.state.logoutLink}
                 setLogoutUpdate={this.state.setLogoutUpdate}
                 undoLink={this.undoLink}
                 history={this.props.history}
                />
        </div>
        <IndexLink to='/'><BluePlateLogo navToHome={this.navToHome} /></IndexLink>
        {this.props.children}
      </div>
    );
  }
});

var BluePlateLogo = React.createClass({

  render: function() {
    return (
      <img src='client/assets/blueplate.png' className='bluePlateLogo' onClick={this.props.navToHome} />
    )
  }
})

module.exports = App;
