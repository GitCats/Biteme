var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link

//OWNER PROFILE PAGE
//
//Creating new deals:
//create deal form (see line 23, limited # of characters for deal description) & submit button
//sends unique AJAX POST request to db with form info => POST/api/owner/create
//re-renders past deals view to include latest deals (should also put allDeals view on a setInterval to update with this info)
//
//Displaying the restaurant profile:
//make a unique AJAX GET request to retrieve previous deals AND profile info already saved, based on restaurant_id in localStorage (append to API route)
//
//Updating the restaurant profile:
//include restaurant address (concat address field values), phone #, description (limit # of characters), cuisine, logo URL & business website(URL) fields & submit button
//make a unique AJAX POST request to update only profile info, not deals (has to update all fields, must include "restaurant_id" identifier in req.body) => api/owner/updateprofile
//
//Displaying past deals:
//show restaurant name, expiration date/time (hour/minute/ampm dropdowns), logo, & text of deal description (based on AJAX GET request referenced above)


var OwnerProfile = React.createClass({

  componentDidMount: function() {
    this.loadPriorSettings();
  },

  loadPriorSettings: function() {
    $.ajax({
      url: 'api/owner/' + localStorage.getItem("restaurant_id"),    //should return all deals and settings
      dataType: 'json',    /*defaults to GET request*/
      success: function(settings) {
        this.setState({settings: settings});
        console.log("Owner settings:", this.state.settings);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("XHR:", xhr, "\nstatus:", status, "\nError:", err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div>
        <Dropdown />
      </div>
    );
  }
});

var Dropdown = React.createClass({

  getInitialState: function() {
    return {cuisine: ""};    //SET TO WHATEVER IS RETURNED FROM PAST ENTRY IN DB
  },

  // componentDidMount: function() {
  //   console.log("Dropdown menu value:", this.state.cuisine);
  // },

  selectCuisine: function(e) {
    this.setState({cuisine: e.target.value});
  },

  render: function() {
    console.log("Current dropdown value:", this.state.cuisine)
    return (
      <form className="ownerForm">
        Street Address: <input type="text" />
        City: <input type="text" />
        State: <input type="text" />
        ZIP: <input type="text" />
        <br/><br/>
        <select onChange={this.selectCuisine}>
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
