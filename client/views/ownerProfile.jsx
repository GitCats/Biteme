var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var LinkedStateMixin = require('react-addons-linked-state-mixin');


//OWNER PROFILE PAGE
//
//Creating new deals <CreateDeal />:
//create deal form (see line 23, limited # of characters for deal description) & submit button
//sends unique AJAX POST request to db with form info => POST/api/owner/create
//re-renders past deals view to include latest deals (should also put allDeals view on a setInterval to update with this info)
//
//Displaying & Updating the restaurant profile <OwnerForm />:
//make a unique AJAX GET request to retrieve previous deals AND profile info already saved, based on restaurant_id in localStorage (append to API route)
//include restaurant address (limit zip chars to 5, concat values on submit), phone #, description (limit # of characters), cuisine, logo URL & business website(URL) fields & submit button
//make a unique AJAX POST request to update only profile info, not deals (has to update all fields, must include "restaurant_id" identifier in req.body) => api/owner/updateprofile
//
//Displaying past deals <PastDeals />:
//show restaurant name, cuisine, expiration date/time (hour/minute/ampm dropdowns), logo, & text of deal description (based on AJAX GET request referenced above)


var OwnerProfile = React.createClass({

  // componentDidMount: function() {
  //   this.loadPriorSettings();
  //   // setInterval(this.loadPriorSettings, 1000);
  // },

  // getInitialState: function() {
  //   return {settings: {}};
  // },

  // loadPriorSettings: function() {
  //   $.ajax({
  //     url: 'api/owner/' + localStorage.getItem("restaurant_id"),
  //     dataType: 'json',    /*defaults to GET request*/
  //     success: function(settings) {
  //       this.setState({settings: settings});
  //       console.log("Owner settings:", this.state.settings);
  //       console.log("Past set cuisine:", this.state.settings[0].cuisine_id);
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       console.error("XHR:", xhr, "\nstatus:", status, "\nError:", err.toString());
  //     }.bind(this)
  //   });
  // },

  render: function() {
    return (
      <div>
        <OwnerForm />
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
      zip: ""
    };
  },

  componentDidMount: function() {
    $.ajax({
      url: 'api/owner/' + localStorage.getItem("restaurant_id"),
      dataType: 'json',    /*defaults to GET request*/
      success: function(settings) {
        var settings = settings[0];
        console.log("Owner settings:", settings);
        var address = settings.address.split(",");
        if (this.isMounted()) {
          this.setState({
            cuisine: settings.cuisine_id,
            address: address[0],
            city: address[1].substr(1),
            state: address[2].substring(1, address[2].length - 6),
            zip: address[2].substr(address[2].length - 5)
          });
        }
        // console.log("Owner settings:", this.state.settings);
        // console.log("Past set cuisine:", this.state.settings.cuisine_id);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("XHR:", xhr, "\nstatus:", status, "\nError:", err.toString());
      }.bind(this)
    // console.log("Dropdown menu value:", this.state.cuisine_id);
    });
  },

  // selectCuisine: function(e) {
  //   this.setState({cuisine: e.target.value});
  // },

  render: function() {
    // console.log("Current dropdown value:", this.state.cuisine);
    console.log("Dropdown menu value:", this.state.cuisine);
    return (
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
    );
  }
});

module.exports = OwnerProfile;
