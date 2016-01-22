var $ = require('jquery');
// var React = require('react');
// var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var OwnerSignup = require('./auth.jsx').ownerSignup;
var OwnerLogin = require('./auth.jsx').ownerLogin;
var Yelp = require('./yelpinfo.jsx');

//OWNER PROFILE PAGE
//
//Creating new deals <CreateDeal />:
//create deal form (see line 22, 35 character limit for deal description) & submit button
//sends unique AJAX POST request to db with form info => POST/api/owner/create
//re-renders past deals view to include latest deals (should also put allDeals view on a setInterval to update with this info)
//
//Displaying & Updating the restaurant profile <OwnerForm />:
//submit button
//concat address values & "trim" all values on submit
//make a unique AJAX POST request to update only profile info, must include "restaurant_id" in req.body) => api/owner/updateprofile
//
//Displaying past deals <PastDeals />:
//show restaurant name, cuisine, expiration date/time (hour/minute/ampm dropdowns), logo, & text of deal description
//based on AJAX GET request referenced above, must loop through all deals

//When done check to see what empty settings do to a newly sign-up owner's profile
//Place the above 3 sections in tabs


var OwnerProfile = React.createClass({

  render: function() {
    if (localStorage.getItem("restaurant_id")) {  //should check for jwt token
      console.log("This will be null:", this.props.children);
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
      settings: [],
      cuisine: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      logo: "",
      phone: "",
      res_description: "",
      website: ""
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
            logo: setting.image_name,
            phone: setting.phone_number,
            res_description: setting.res_description,
            website: setting.url
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
        <br/>
        <img src={this.state.logo} alt="Your Logo" className="dealLogo" style={{margin: 25}} />
        Enter a new URL to update your logo: <input type="text" valueLink={this.linkState("logo")} size="70" />
        <form className="ownerForm">
          Street Address: <input type="text" valueLink={this.linkState("address")} /> 
          City: <input type="text" valueLink={this.linkState("city")} /> 
          State: <input type="text" valueLink={this.linkState("state")} /> 
          ZIP: <input type="text" valueLink={this.linkState("zip")} maxLength="5" /> 
          <br/><br/>
          Phone number (which customers should use to call the restaurant): <input type="text" valueLink={this.linkState("phone")} maxLength="14" />
          Business website: <input type="text" valueLink={this.linkState("website")} />
          <br/><br/>Select the cuisine that best matches your restaurant:
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
          <br/><br/>
          <p>Describe your restaurant in a few lines:</p>
          <textarea valueLink={this.linkState("res_description")} rows="3" cols="68" maxLength="200" />
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
      <div className="dealBox">
        <h1>Past Deals</h1>
        <br/>
        <DealList data={this.props.settings} />
      </div>
    );
  }
});


var DealList = React.createClass({

  render: function() {
    var dealNodes = this.props.data.map(function(deal) {
      return (
        <Deal res_description={deal.res_description} cuisine={deal.cuisine_id} day={deal.day} year={deal.year} month={deal.month} name={deal.name} url={deal.url} address={deal.address} description={deal.description} expiration={deal.expiration} image_name={deal.image_name} name={deal.name} key={deal.deal_id}>
        </Deal>
      );
    });
    return (
      <div className="dealList">
        {dealNodes}
      </div>
    );
  }
});


var Deal = React.createClass({

  render: function() {

    //formatting date 
    var calendarMonths = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December"
    }
    //getting the year. if the deal year is also the current year, won't display. If it's next year 
    //(like if an owner puts in a deal in December for January), then it will display. 

    //grab the current year
    var currentYear = new Date().getFullYear(); 

    var month = calendarMonths[this.props.month];
    if(this.props.year === currentYear) {
      var displayDate = month + " " + this.props.day;
    } else {
      var displayDate =  month + " " + this.props.day + ", " + this.props.year;
    } 

      //formatting time
      var num = this.props.expiration
      var minutes = num.toString().slice(-2);
      if(num.toString().length === 4) {
        var hours = num.toString().slice(0, 2);
      } else {
        var hours = num.toString().slice(0, 1);
      }
      var period;
      if(hours < 12) {
        period = "am";
      }
      if(hours >= 12) {
        if(hours === "12") {
          period = "am";
        } else {
          hours = hours - 12;
          period = "pm";
        } 
      }
    var displayTime = hours + ":" + minutes + period;

    //formatting type of cuisine
    var cuisineMap = {
      1: "Mexican",
      2: "Fast Food",
      3: "Pizza",
      4: "Sandwiches",
      5: "Burgers",
      6: "American",
      7: "Barbecue",
      8: "Diner",
      9: "Chinese",
      10: "Italian",
      11: "Japanese",
      12: "Vietnamese",
      13: "Thai",
      14: "Steakhouse",
      15: "Indian",
      16: "Other"
    }
    var displayCuisine = cuisineMap[this.props.cuisine];

    return (
      <div className="deal col-md-6 col-sm-12" >
        <div className="dealLogoDiv">
          <img src={this.props.image_name} className="dealLogo" />
        </div>
        <div className="dealInfoDiv">
          <h3 className="dealDescription">
            {this.props.description}
          </h3>
          <div className="dealUrl">
            {this.props.url}
          </div>
          <div className="dealAddress">
            {this.props.address.split(",")}
          </div>
          <div className="dealExpiration">
            {displayDate} {displayTime}
          </div>
        </div>  
      </div>
    );
  }
});


module.exports = OwnerProfile;
