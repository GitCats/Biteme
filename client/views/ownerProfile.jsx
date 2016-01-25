var $ = require('jquery');
var Link = require('react-router').Link;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Datetime = require('react-datetime');

//OWNER PROFILE PAGE
//
//Creating new deals <CreateDeal />:
//expiration (INTEGER, ex: 1700, 24 hr time, no colons), calendar select:(month(INT value), day, year)
//sends unique AJAX POST => "api/owner/create/"+localStorage.getItem("restaurant_id")
//re-renders past deals view to include latest deals (should also put allDeals view on a setInterval to update with this info)
//
//Displaying & Updating the restaurant profile <OwnerForm />:
//concat address values & "trim" all values on submit
//update GET request API route to "api/owner/getAllDeals/"+id after KaylaM's update
//make a unique AJAX POST request to update only profile info, must include "restaurant_id" in req.body) => api/owner/updateprofile
//
//Displaying past deals <PastDeals />:
//
//When done check to see what empty settings do to a newly sign-up owner's profile
//Place the above 3 sections in tabs


//Note about this module: the AJAX request in OwnerForm and its state-setting arguably should 
//have been done in the parent OwnerProfile component. But we learned a lot about React
//in figuring out how to pass values around from a child component to others and managed to get
//everything displaying as expected with just one AJAX request. The values had to be state
//properties in OwnerForm so as to be mutable and the source of truth, but they could just as
//well have been set as props upon AJAX success in OwnerProfile, passed down as properties, and
//reset to state values in OwnerForm.

var OwnerProfile = React.createClass({

  getInitialState: function() {
    var passProps = function(data) {
      this.setState({settings: data[0]});
    };
    //bind this component's "this" to pass the function to the child component, call it from
    //there, and change the state of this parent component, so that the sibling CreateDeal
    //can get the data from the AJAX request in OwnerForm
    var boundProps = passProps.bind(this);
    return { 
      getProps: boundProps,
      settings: {}  //must set initial state for anything passed down
    }
  },

  render: function() {
    if (localStorage.getItem("restaurant_id")) {  //should check for jwt token
      return (
        <div>
          <CreateDeal initialData={this.state.settings} />
          <OwnerForm updateParent={this.state.getProps} />
        </div>
      );
    } else {
      return (
        <div>
          <h1>YOU ARE NOT LOGGED IN AS A RESTAURANT OWNER</h1>
          <p className="text">
            If {"you're"} just looking for deals, please <Link to={"/"}>visit our main page here.</Link>
          </p>
        </div>
      )
    }
  }
});


var CreateDeal = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      description: "",
      totalExpiration: new Date(),
      expiration: "",
      month: "",
      day: "",
      year: ""
    }
  },

  chooseDate: function(momentObj) {
    this.setState({ totalExpiration: momentObj._d });
    var time = this.state.totalExpiration;
    console.log("Selected time:", time.getHours());
    //we don't want 0 in front of hours less than 10, midnight should be 2400, all should be numbers, and months are mapped from 1 - 12
  },

  postDeal: function(e) {
    e.preventDefault();
    var description = this.state.description.trim();
    
    $.ajax({
      url: ,
      dataType: 'json',
      type: 'POST',
      data: ,
      success: function(data) {
        
        this.setState({description: '', totalExpiration: new Date()});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });


  },

  render: function() {
    var yesterday = Datetime.moment().subtract(1,'day');
    var valid = function(current) {
      return current.isAfter( yesterday );
    };
    return (
      <div>
        <form>
          <h1>Create a Deal</h1>
          <br/>
          <h3 className="text">Make a deal for {this.props.initialData.name}</h3>
          <br/>
          <p className="text">Describe your deal in a few words: </p>
            <input type="text" valueLink={this.linkState("description")} className="dealSubmit" size="40" maxLength="35" />
          <br/><br/>
          <p className="text">When will your deal expire?</p>
          <Datetime open={ true } isValidDate={ valid } value={this.state.totalExpiration} onChange={this.chooseDate} />
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <input type="submit" className="dealSubmit" value="Post My Deal!" />
          <br/><br/>
        </form>
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
        var address = setting.address.split(",");
          //Each setState command re-renders components
          this.setState({
            settings: settings,
            name: setting.name,
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
        this.props.updateParent(this.state.settings);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("XHR:", xhr, "\nstatus:", status, "\nError:", err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div>
        <h1>Create or Update Your Restaurant Profile</h1>
        <br/>
        <form>
          Restaurant name: <input type="text" valueLink={this.linkState("name")} />
          <img src={this.state.logo} alt="Your Logo" className="dealLogo" style={{margin: 25}} />
          Enter a new URL to update your logo: <input type="text" valueLink={this.linkState("logo")} size="70" />
          <div className="dealSubmit text">
            Street Address: <input type="text" valueLink={this.linkState("address")} /> 
            City: <input type="text" valueLink={this.linkState("city")} /> 
            State: <input type="text" valueLink={this.linkState("state")} /> 
            ZIP: <input type="text" valueLink={this.linkState("zip")} maxLength="5" /> 
            <br/><br/>
            Phone number (which customers should use to call the restaurant): 
            <input type="text" valueLink={this.linkState("phone")} maxLength="14" />
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
            <br/><br/>
            <input type="submit" value="Update Restaurant Profile" />
          </div>
        </form>
        <PastDeals settings={this.state.settings} />
        <Link to={"/"} className="dealSubmit text">Go to Main Page</Link>
      </div>
    );
  }
});


var PastDeals = React.createClass({

  render: function() {
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
        <Deal 
          res_description={deal.res_description} 
          cuisine={deal.cuisine_id} day={deal.day} 
          year={deal.year} month={deal.month} 
          name={deal.name} url={deal.url} 
          address={deal.address} 
          description={deal.description} 
          expiration={deal.expiration} 
          image_name={deal.image_name} 
          name={deal.name} 
          key={deal.deal_id}>
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
