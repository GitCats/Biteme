var $ = require("jquery");
var Link = require("react-router").Link;
var Modal = require("react-modal");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var Datetime = require("react-datetime");
var ReactTabs = require("react-tabs");
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

const customStyles = {
  content : {
    top                   : "50%",
    left                  : "50%",
    right                 : "auto",
    bottom                : "auto",
    marginRight           : "-50%",
    transform             : "translate(-50%, -50%)"
  }
};

//OWNER PROFILE PAGE TO-DO LIST:
//
//**add "Delete Deal" button with AJAX request on current deals to expire them
//**EVERY AJAX REQUEST ON THIS PAGE SHOULD HAVE A TOKENAUTH HEADER THAT IS VERIFIED ON THE BACKEND
//**FIX DEAL DISPLAY WHERE PROPS SPILL OUT OF DIV (TRY DIFFERENT LOGOS, RESIZING WINDOWS)


//Note about this module: the AJAX request in OwnerForm and its state-setting could 
//have been done in the parent OwnerProfile component. The values had to be state
//properties in OwnerForm so as to be mutable and the source of truth, but they probably
//could have been state values in OwnerProfile upon AJAX success and passed down as properties.

var OwnerProfile = React.createClass({

  getInitialState: function() {
    //Bind this component's "this" to pass the function to the child component, call it from
    //there, and change the state of this parent component, so that the sibling CreateDeal
    //can get the data as props from the AJAX request in OwnerForm.
    var passProps = function(data) {
      this.setState({settings: data[0]});
    };
    //Here, passDeals uses the same principle to update the state of this parent component, 
    //thus updating props in CurrentDealList and ExpiredDealList, and finally the Deal 
    //component, all triggered by creating deals and re-rendering Current Deals by calling 
    //the GET request here.
    var passDeals = function() {
      this.loadDealsFromServer();
    };
    var boundProps = passProps.bind(this);
    var boundDeals = passDeals.bind(this);
    return { 
      //Must set initial state for anything passed down.
      getProps: boundProps,
      updateDeals: boundDeals,
      deals: [],
      settings: {}
    }
  },

  componentDidMount: function() {
    this.loadDealsFromServer();
  },

  handleClick: function() {
    window.scrollTo(0, 0);
  },

  loadDealsFromServer: function() {
    $.ajax({
      url: "api/owner/getAllDeals/" + localStorage.getItem("restaurant_id"),
      dataType: "json",
      success: function(deals) {
        this.setState({ deals: deals });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    if (localStorage.getItem("token") && localStorage.getItem("restaurant_id") !== "undefined") {
      return (
        <div>
          <CreateDeal initialData={this.state.settings} updateDeals={this.state.updateDeals} />
          
          <Tabs onSelect={this.handleSelect}>
            <TabList>
              <Tab>Restaurant Profile</Tab>
              <Tab>Current Deals</Tab>
              <Tab>Expired Deals</Tab>
            </TabList>
            <TabPanel>
              <OwnerForm updateParent={this.state.getProps} />
            </TabPanel>
            <TabPanel>
              <h1>Current Deals</h1>
              <br/>
              <CurrentDealList deals={this.state.deals} updateDeals={this.state.updateDeals} />
            </TabPanel>
            <TabPanel>
              <h1>Expired Deals</h1>
              <br/>
              <ExpiredDealList deals={this.state.deals} />
            </TabPanel>
          </Tabs>
          <br/>
          <div>
            <a onClick={this.handleClick} className="text" style={{display: "inline-block", width: "10%", marginLeft: "45.5%"}} >Go to Top of Page</a><br/><br/>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>YOU ARE NOT LOGGED IN AS A RESTAURANT OWNER</h1>
          <p className="text" >
            If {"you're"} just looking for deals, please <Link to={"/"}>visit our main page here.</Link>
          </p>
        </div>
      )
    }
  }
});


var CreateDeal = React.createClass({

  mixins: [LinkedStateMixin],

  openModal: function() {
    this.setState({modalIsOpen: true});
  },
 
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  getInitialState: function() {
    return {
      modalIsOpen: false,
      description: "",
      totalExpiration: new Date(),
      expiration: "",
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      year: new Date().getFullYear()
    }
  },

  chooseDate: function(momentObj) {
    this.setState({ totalExpiration: momentObj._d });
    var time = this.state.totalExpiration;
    var hour = time.getHours();
    var minute = function() {
      if (time.getMinutes() < 10) {
        return "0" + time.getMinutes();
      } else {
        return time.getMinutes();
      }
    }()
    var expiration = function() {
      if (hour.toString() + minute.toString() === "000") {
        return "2400";
      } else {
        return hour.toString() + minute.toString();
      }
    }()
    this.setState({ expiration: expiration });
  },

  postDeal: function(e) {
    e.preventDefault();
    var description = this.state.description.trim();
    if (!description) {
      alert("You must enter a description for your deal.");
      return;
    }
    var newDeal = { 
                    restaurant_id: localStorage.getItem("restaurant_id"), 
                    description: description,
                    expiration: this.state.expiration,
                    month: this.state.totalExpiration.getMonth() + 1,
                    day: this.state.totalExpiration.getDate(),
                    year: this.state.totalExpiration.getFullYear()
                  };
    this.submitDeal(newDeal);
  },

  submitDeal: function(deal) {
    $.ajax({
      url: "api/owner/create",
      dataType: "text",
      type: "POST",
      data: deal,
      success: function(res) {
        alert("Your deal has been posted!");
        this.setState({ description: "", 
                        totalExpiration: new Date(), 
                        expiration: "", 
                        month: new Date().getMonth() + 1, 
                        day: new Date().getDate(), 
                        year: new Date().getFullYear() 
                      });
        //Call bound function from OwnerProfile to run AJAX request to update past deals.
        this.props.updateDeals();
        this.closeModal();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        alert("There was an error processing your request.");
      }.bind(this)
    });
  },

  render: function() {
    var yesterday = Datetime.moment().subtract(1, "day");
    var valid = function(current) {
      return current.isAfter( yesterday );
    };
    if (this.props && this.props.initialData.name && this.props.initialData.url && 
        this.props.initialData.res_description && this.props.initialData.image_name && 
        this.props.initialData.address && this.props.initialData.phone_number) {
      return (
        <div>
          <div style={{margin: "auto", width: "7.5%"}}>
            <br/><br/>
            <button onClick={this.openModal} style={{width:"110px", height:"35px"}}>Create a Deal</button>
          </div>
          <Modal
            isOpen={this.state.modalIsOpen}   //isOpen, onRequestClose, & style appear to be
            onRequestClose={this.closeModal}  //native to react-modal
            style={customStyles} >
            <br/>
            <img src="client/assets/x-sm-gray.png" onClick={this.closeModal} style={{float: "right", maxWidth: "10px", cursor: "pointer" }} />
            <br/>
            <h1>Create a Deal for {this.props.initialData.name}</h1>
            <br/>
            <form onSubmit={this.postDeal} style={{marginLeft: "100px"}}>
              <p>Describe your deal in a few words: </p>
              <input valueLink={this.linkState("description")} size="40" maxLength="35" />
              <br/><br/>
              <p>When will your deal expire?</p>
              <Datetime open={true} isValidDate={valid} value={this.state.totalExpiration} onChange={this.chooseDate} />
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
              <input type="submit" style={{marginLeft: "20%"}} value="Post My Deal!" />
              <br/><br/><br/>
            </form>
          </Modal>
          <br/><br/>
        </div>
      )
    } else {
      return (
        <div>
          <h3 className="text">Please Complete Your Profile to Create a Deal</h3>
          <br/>
        </div>
      )
    }
  }
});


var OwnerForm = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      settings: [],
      name: "",
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
      url: "api/owner/getProfile/"+localStorage.getItem("restaurant_id"),
      dataType: "json",             //defaults to GET request
      success: function(settings) {
        var setting = settings[0];
        var address = setting ? setting.address ? setting.address.split(",") : "" : "";
          //Each setState command re-renders components
          //Ternary operators are just a failsafe but not having them doesn't break anything
          this.setState({
            settings: settings,
            name: setting ? setting.name : "",
            cuisine: setting ? setting.cuisine_id : "",
            address: address ? address[0] : "",
            city: address ? address[1].substr(1) : "",
            state: address ? address[2].substring(1, address[2].length - 6) : "",
            zip: address ? address[2].substr(address[2].length - 5) : "",
            logo: setting ? setting.image_name : "",
            phone: setting ? setting.phone_number : "",
            res_description: setting ? setting.res_description : "",
            website: setting ? setting.url : ""
          });
        //Update the initialData props in CreateDeal on load (see comments in this.submitUpdate).
        this.props.updateParent(this.state.settings);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("XHR:", xhr, "\nstatus:", status, "\nError:", err.toString());
      }.bind(this)
    });
  },

  updateProfile: function(e) {
    e.preventDefault;
    var name = this.state.name.trim();
    var logo = this.state.logo.trim();
    var address = this.state.address.trim();
    var city = this.state.city.trim();
    var state = this.state.state.trim();
    var zip = this.state.zip.trim();
    var res_description = this.state.res_description.trim();
    var website = this.state.website.trim();
    var phone = this.state.phone.trim();
    var updates = { 
                    restaurant_id: localStorage.getItem("restaurant_id"),
                    name: name,
                    image_name: logo,
                    address: [address, city, state + " " + zip].join(", "),
                    cuisine_id: this.state.cuisine,
                    res_description: res_description,
                    url: website,
                    phone_number: phone
                  };
    this.submitUpdate(updates);
  },

  submitUpdate: function(updates) {
    $.ajax({
      url: "api/owner/updateprofile",
      dataType: "text",
      type: "POST",
      data: updates,
      success: function(res) {
        alert("Your profile has been updated.");
        //Reset this.state.settings...
        this.setState({
          settings: [{
            address: updates.address,
            cuisine_id: updates.cuisine_id,
            restaurant_id: updates.restaurant_id,
            name: updates.name,
            image_name: updates.image_name,
            res_description: updates.res_description,
            url: updates.url,
            phone_number: updates.phone_number
          }]
        })
        //...and call the bound function from OwnerProfile with the new values to update & run a 
        //check on CreateDeal's initialData props to determine whether the owner's profile is 
        //complete and if creating deals should be allowed (see render function for CreateDeal).
        this.props.updateParent(this.state.settings);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        alert("There was an error processing your request.");
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div>
        <h1>Update Your Restaurant Profile</h1>
        <form onSubmit={this.updateProfile}>
          Restaurant name: <input type="text" valueLink={this.linkState("name")} />
          <img src={this.state.logo} alt="Your Logo" className="dealLogo" style={{margin: 25}} />
          Enter a new URL to update your logo: <input type="text" valueLink={this.linkState("logo")} size="60" />
          <div className="text">
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
      </div>
    );
  }
});


var CurrentDealList = React.createClass({

  componentDidMount: function() {
    this.props.updateDeals();
  },

  filterByExpiration: function(value) {
    var expHour;
    var expMin;
    if(value.expiration.length === 4) {
      expHour = value.expiration.substr(0, 2);
      expMin = value.expiration.slice(-2);
    } else {
      expHour = parseInt(value.expiration.substr(0, 1));
      expMin = parseInt(value.expiration.slice(-2));
    }
    //milliseconds of when deal will expire
    var date = +new Date(value.year, value.month-1, value.day, expHour, expMin, 59);
    if (Date.now() < date) {
      return true;
    } else {
      return false;
    }
  },

  render: function() {
    var dealsToUse = this.props.deals.filter(this.filterByExpiration);
    var dealNodes = dealsToUse.sort(function(a, b) {
      if(a.expiration.length === 4) {
        expHourA = a.expiration.substr(0, 2);
        expMinA = a.expiration.slice(-2);
      } else {
        expHourA = parseInt(a.expiration.substr(0, 1));
        expMinA = parseInt(a.expiration.slice(-2));
      }
      if(b.expiration.length === 4) {
        expHourB = b.expiration.substr(0, 2);
        expMinB = b.expiration.slice(-2);
      } else {
        expHourB = parseInt(b.expiration.substr(0, 1));
        expMinB = parseInt(b.expiration.slice(-2));
      }
      var dateA = +new Date(a.year, a.month-1, a.day, expHourA, expMinA, 59);
      var dateB = +new Date(b.year, b.month-1, b.day, expHourB, expMinB, 59);
      return dateA-dateB;
    }).map(function(deal) {
      return (
        <Deal 
          res_description={deal.res_description} 
          cuisine={deal.cuisine_id} 
          day={deal.day} 
          year={deal.year} 
          month={deal.month} 
          name={deal.name} 
          url={deal.url} 
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
      <div className="dealList" style={{height: "100%"}} >
        {dealNodes}
      </div>
    );
  }
});


var ExpiredDealList = React.createClass({

  filterByExpiration: function(value) {
    var expHour;
    var expMin;
    if(value.expiration.length === 4) {
      expHour = value.expiration.substr(0, 2);
      expMin = value.expiration.slice(-2);
    } else {
      expHour = parseInt(value.expiration.substr(0, 1));
      expMin = parseInt(value.expiration.slice(-2));
    }
    //milliseconds of when deal will expire
    var date = +new Date(value.year, value.month-1, value.day, expHour, expMin, 59);
    if (Date.now() > date) {
      return true;
    } else {
      return false;
    }
  },

  render: function() {
    var dealsToUse = this.props.deals.filter(this.filterByExpiration);
    var dealNodes = dealsToUse.sort(function(a, b) {
      if(a.expiration.length === 4) {
        expHourA = a.expiration.substr(0, 2);
        expMinA = a.expiration.slice(-2);
      } else {
        expHourA = parseInt(a.expiration.substr(0, 1));
        expMinA = parseInt(a.expiration.slice(-2));
      }
      if(b.expiration.length === 4) {
        expHourB = b.expiration.substr(0, 2);
        expMinB = b.expiration.slice(-2);
      } else {
        expHourB = parseInt(b.expiration.substr(0, 1));
        expMinB = parseInt(b.expiration.slice(-2));
      }
      var dateA = +new Date(a.year, a.month-1, a.day, expHourA, expMinA, 59);
      var dateB = +new Date(b.year, b.month-1, b.day, expHourB, expMinB, 59);
      return dateA-dateB;
    }).map(function(deal) {
      return (
        <Deal 
          res_description={deal.res_description} 
          cuisine={deal.cuisine_id} 
          day={deal.day} 
          year={deal.year} 
          month={deal.month} 
          name={deal.name} 
          url={deal.url} 
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
    //Getting the year. If the deal year is also the current year, won't display. If it's next year 
    //(like if an owner puts in a deal in December for January), then it will display. 

    //Grab the current year.
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
      if(hours === "0") {
        hours = "12";
      }
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
    return (
      <div className="deal col-md-6 col-sm-12" >
        <div className="dealLogoDiv">
          <img src={this.props.image_name} className="dealLogo" />
          <div style={{marginLeft: "20", fontStyle: "italic"}}>{this.props.res_description}</div>
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
