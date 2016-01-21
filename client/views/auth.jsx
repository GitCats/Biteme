var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');

/*
By default the modal is anchored to document.body. All of the following overrides are available.
 
* element
Modal.setAppElement(appElement);
 
* query selector - uses the first element found if you pass in a class.
Modal.setAppElement('#your-app-element');
 
*/
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
 
var UserSignup = React.createClass({
 
  getInitialState: function() {
    return { modalIsOpen: false };
  },
 
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
 
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },

  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },

  signUp: function(e) {
    e.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    if (!email || !password) {
      alert("You must complete the form to sign up.")
      return;
    }
    var signUpRequest = { email: email, password: password };
    $.ajax({
      url: 'api/login/signup',
      dataType: 'text',
      type: 'POST',
      data: signUpRequest,
      success: function(res) {
        localStorage.setItem("user", signUpRequest.email);
        console.log("Logged in as:", localStorage.getItem("user"));
        this.closeModal();
        window.location = '#ownerprofile';
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("XHR:", xhr, "\nstatus:", status, "\nError:", err.toString());
        this.setState({email: '', password: ''});
        xhr.status === 401 ? alert("Someone already signed up with that email address.") : null;
      }.bind(this)
    });
  },
 
  render: function() {
    return (
      <span>
        <a onClick={this.openModal}>Sign Up</a>
        <Modal
          isOpen={this.state.modalIsOpen}   //isOpen, onRequestClose, & style appear to be
          onRequestClose={this.closeModal}  //native to react-modal
          style={customStyles} >
          <h2>Sign Up for Notifications</h2>
          <form className='signupForm' onSubmit={this.signUp}>
            Email: <input 
                    className='email' 
                    value={this.state.email} 
                    onChange={this.handleEmailChange}
                    /><br/>
            Password: <input 
                      className='password' 
                      value={this.state.password} 
                      onChange={this.handlePasswordChange}
                      type='password' 
                      /><br/><br/>
            <input type='submit' value='Sign Up!' /><br/><br/>
            <button onClick={this.closeModal}>Close this Box</button>
          </form>
        </Modal>
      </span>
    );
  }
});

var UserLogin = React.createClass({
 
  getInitialState: function() {
    return { modalIsOpen: false };
  },
 
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
 
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },

  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },

  login: function(e) {
    e.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    if (!email || !password) {
      alert("You must complete the form to log in.")
      return;
    }
    var loginRequest = { email: email, password: password };
    $.ajax({
      url: 'api/login/signin',
      dataType: 'text',
      type: 'POST',
      data: loginRequest,
      success: function(res) {
        localStorage.setItem("user", loginRequest.email);
        console.log("Logged in as:", localStorage.getItem("user"));
        this.closeModal();
        window.location = '#ownerprofile';
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("XHR:", xhr, "\nstatus:", status, "\nError:", err.toString());
        this.setState({email: '', password: ''});
        xhr.status !== 200 ? alert("Incorrect username or password.") : null;
      }.bind(this)
    });
  },
 
  render: function() {
    return (
      <span>
        <a onClick={this.openModal}>Sign In</a>
        <Modal
          isOpen={this.state.modalIsOpen}   //isOpen, onRequestClose, & style appear to be
          onRequestClose={this.closeModal}  //native to react-modal
          style={customStyles} >
          <h2>Log In to Manage Notifications</h2>
          <form className='loginForm' onSubmit={this.login}>
            Email: <input 
                    className='email' 
                    value={this.state.email} 
                    onChange={this.handleEmailChange}
                    /><br/>
            Password: <input 
                      className='password' 
                      value={this.state.password} 
                      type='password' 
                      onChange={this.handlePasswordChange}
                      /><br/><br/>
            <input type='submit' value='Log In' /><br/><br/>
            <button onClick={this.closeModal}>Close this Box</button>
          </form>
        </Modal>
      </span>
    );
  }
});

var OwnerSignup = React.createClass({   //Prompt only, no AJAX request
 
  getInitialState: function() {
    return { modalIsOpen: false };
  },
 
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
 
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
 
  render: function() {
    return (
      <span>
        <a onClick={this.openModal}>Sign Up</a>
        <Modal
          isOpen={this.state.modalIsOpen}   //isOpen, onRequestClose, & style appear to be
          onRequestClose={this.closeModal}  //native to react-modal
          style={customStyles} >
          <h2>Call us at (512)-555-5555 to register an account.</h2>
        </Modal>
      </span>
    );
  }
});

var OwnerLogin = React.createClass({   //Update API route when ready
 
  getInitialState: function() {
    return { modalIsOpen: false };
  },
 
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
 
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },

  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },

  ownerLogin: function(e) {
    e.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    if (!email || !password) {
      alert("You must complete the form to log in.")
      return;
    }
    var ownerLoginRequest = { username: email, password: password };
    $.ajax({
      url: 'api/owner/login',
      dataType: 'json',
      type: 'POST',
      data: ownerLoginRequest,
      success: function(res) {
        console.log("Owner Login Response:", res.restaurant_id);
        localStorage.setItem("user", ownerLoginRequest.username);
        localStorage.setItem("restaurant_id", res.restaurant_id);
        console.log("Logged in as:", localStorage.getItem("user"));
        this.closeModal();
        window.location = '#ownerprofile';
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("XHR:", xhr, "\nstatus:", status, "\nError:", err.toString());
        this.setState({email: '', password: ''});
        xhr.status !== 200 ? alert("Incorrect username or password.") : null;
      }.bind(this)
    });
  },
 
  render: function() {
    return (
      <span>
        <a onClick={this.openModal}>Sign In</a>
        <Modal
          isOpen={this.state.modalIsOpen}   //isOpen, onRequestClose, & style appear to be
          onRequestClose={this.closeModal}  //native to react-modal
          style={customStyles} >
          <h2>Log In to Manage Deals</h2>
          <form className='loginForm' onSubmit={this.ownerLogin}>
            Email: <input 
                    className='email' 
                    value={this.state.email} 
                    onChange={this.handleEmailChange}
                    /><br/>
            Password: <input 
                      className='password' 
                      value={this.state.password} 
                      type='password' 
                      onChange={this.handlePasswordChange}
                      /><br/><br/>
            <input type='submit' value='Log In' /><br/><br/>
            <button onClick={this.closeModal}>Close this Box</button>
          </form>
        </Modal>
      </span>
    );
  }
});

module.exports.signup = UserSignup;
module.exports.login = UserLogin;
module.exports.ownerSignup = OwnerSignup;
module.exports.ownerLogin = OwnerLogin;


