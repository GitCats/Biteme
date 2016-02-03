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
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand glyphicon glyphicon-home" href="#"></a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-left">
                <li><a href="#">Sign Up <span className="sr-only">(current)</span></a></li>
                <li><a href="#">Log In</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Restaurant Owner? <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">Sign In</a></li>
                    <li><a href="#">Sign Up</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Edit Profile</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
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
