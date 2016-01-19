var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link

//OWNER PROFILE PAGE
//For the restaurant profile:
//restaurant address & description including cuisine (choose 1 from dropdown) -- unique AJAX
//logo URL & business website(URL)
//For each deal:
//expiration date & time dropdown fields
//text field for deal description (limited # of characters)
//create deal button at the bottom (send unique AJAX request to db with form info)
//only submit properties that have been changed

var OwnerProfile = React.createClass({



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
    return {cuisine: ""};
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
        <select onChange={this.selectCuisine}>
          <option value="">-Choose your cuisine-</option>
          <option value="Mexican">Mexican</option>
          <option value="Thai">Thai</option>
          <option value="Americana">Americana</option>
        </select>
      </form>
    );
  }
});

module.exports = OwnerProfile;
