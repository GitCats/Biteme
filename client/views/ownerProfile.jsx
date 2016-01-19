var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link

//OWNER PROFILE PAGE
//For the restaurant profile:
//restaurant address & description including cuisine (choose 1 from dropdown)
//logo URL
//For each deal:
//expiration date & time dropdown fields
//text field for deal description (limited # of characters)
//create deal button at the bottom (send AJAX request to db with form info)

var OwnerProfile = React.createClass({
  render: function() {
    return (
      <h1 className="ownerProfile">
        Fill out this page.
      </h1>
    );
  }
});


module.exports = OwnerProfile;
