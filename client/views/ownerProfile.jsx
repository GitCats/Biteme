var $ = require('jquery');
// var React = require('react');
// var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var OwnerSignup = require('./auth.jsx').ownerSignup;
var OwnerLogin = require('./auth.jsx').ownerLogin;

//OWNER PROFILE PAGE
//
//Creating new deals <CreateDeal />:
//create deal form (see line 23, 35 character limit for deal description) & submit button
//sends unique AJAX POST request to db with form info => POST/api/owner/create
//re-renders past deals view to include latest deals (should also put allDeals view on a setInterval to update with this info)
//
//Displaying & Updating the restaurant profile <OwnerForm />:
//make a unique AJAX GET request to retrieve previous deals AND profile info already saved, based on restaurant_id in localStorage (append to API route)
//include restaurant address (limit zip chars to 5, concat values on submit), phone #, description (limit # of characters), cuisine, logo URL & business website(URL) fields & submit button
//make a unique AJAX POST request to update only profile info, not deals (has to update all fields, must include "restaurant_id" identifier in req.body) => api/owner/updateprofile
//
//Displaying past deals <PastDeals />:
//show restaurant name, cuisine, expiration date/time (hour/minute/ampm dropdowns), logo, & text of deal description
//based on AJAX GET request referenced above, must loop through all deals

//When done check to see what empty settings do to a newly sign-up owner's profile


var OwnerProfile = React.createClass({

  render: function() {
    if (localStorage.getItem("restaurant_id")) {  //should check for jwt token
      return (
        <div>
          <CreateDeal />
          <OwnerForm />
        </div>
      );
    } else {
      return (
        <div>
          <h1>YOU ARE NOT LOGGED IN AS A RESTAURANT OWNER</h1>
          <p className="text">If {"you're"} just looking for deals, please <Link to={"/"}>visit our main page here.</Link></p>
        </div>
      )
    }
  }
});


var CreateDeal = React.createClass({

  render: function() {
    return (
      <div>
        <h1>Create a Deal</h1>
        <br/><br/>
        When will your deal expire?
        Month: <input type="text" />
        Day: <input type="text" />
        Year: <input type="text" />
        <br/><br/>
      </div>
    );
  }
});


var OwnerForm = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      cuisine: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      logo: ""
    };
  },

  componentDidMount: function() {
    $.ajax({
      url: "api/owner/"+localStorage.getItem("restaurant_id"),
      dataType: "json",             //defaults to GET request
      success: function(settings) {
        var setting = settings[0];
        console.log("Owner settings:", setting);
        var address = setting.address.split(",");
        // if (this.isMounted()) {
          this.setState({          //Each setState command re-renders components
            settings: settings,
            cuisine: setting.cuisine_id,
            address: address[0],
            city: address[1].substr(1),
            state: address[2].substring(1, address[2].length - 6),
            zip: address[2].substr(address[2].length - 5),
            logo: setting.image_name
          });
        // }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("XHR:", xhr, "\nstatus:", status, "\nError:", err.toString());
      }.bind(this)
    });
  },

  render: function() {
    console.log("Dropdown menu value:", this.state.cuisine);
    return (
      <div>
        <h1>Create or Update Your Restaurant Profile</h1>
        <br/><br/>
        <img src={this.state.logo} alt="Your Logo" className="dealLogo" />
        <form className="ownerForm">
          Street Address: <input type="text" valueLink={this.linkState("address")} /> 
          City: <input type="text" valueLink={this.linkState("city")} /> 
          State: <input type="text" valueLink={this.linkState("state")} /> 
          ZIP: <input type="text" valueLink={this.linkState("zip")} /> 
          <br/><br/>
          <select valueLink={this.linkState("cuisine")} >
            <option value="">-Choose your cuisine-</option>
            <option value="1">Mexican</option>
            <option value="2">Fast Food</option>
            <option value="3">Pizza</option>
            <option value="4">Sandwiches</option>
            <option value="5">Burgers</option>
            <option value="6">American</option>
            <option value="7">BBQ</option>
            <option value="8">Diner</option>
            <option value="9">Chinese</option>
            <option value="10">Italian</option>
            <option value="11">Japanese</option>
            <option value="12">Vietnamese</option>
            <option value="13">Thai</option>
            <option value="14">Steakhouse</option>
            <option value="15">Indian</option>
            <option value="16">Other</option>
          </select>
        </form>
        <PastDeals settings={this.state.settings} />
      </div>
    );
  }
});


var PastDeals = React.createClass({

  render: function() {
    console.log("PastDeals settings property:", this.props.settings);
    return (
      <div>
        <h1>Past Deals</h1>
        <br/><br/><br/><br/><br/>
      </div>
    );
  }
});

module.exports = OwnerProfile;
