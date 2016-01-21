//might not need all of these - only $ react, reactdom, auth, link from SO
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
// var Router = require('react-router').Router;
// var Route = require('react-router').Route;
// var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link
var Modal = require('react-modal');
// var Maps = require('google-maps')
var Map = require('./map.jsx')
var Yelp = require('./yelpinfo.jsx')


var Deal = React.createClass({
  getInitialState: function() {
    return { modalIsOpen: false,
             date: '' };
  },

  openModal: function() {
    this.setState({ modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({ modalIsOpen: false});
  },

  render: function() {

    //formatting date 
    var calendarMonths = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    }
    //getting the year. if the deal year is also the current year, won't display. If it's next year 
    //(like if an owner puts in a deal in December for January), then it will display. 

    //grab the current year
    var currentYear = new Date().getFullYear(); 

    var month = calendarMonths[this.props.month];
    if(this.props.year === currentYear) {
      var displayDate = month + ' ' + this.props.day;
    } else {
      var displayDate =  month + ' ' + this.props.day + ', ' + this.props.year;
    } 

      //formatting time
      var num = this.props.expiration
      var minutes = num.toString().slice(-2);
      if(num.toString().length === 4) {
        var hours = num.toString().slice(0, 2)
      } else {
        var hours = num.toString().slice(0, 1)
      }
      var period;
      if(hours < 12) {
        period = 'am'
      }
      if(hours >= 12) {
          if(hours === '12') {
            period = 'am'
          } else {
            hours = hours - 12;
            period = 'pm'
          } 
      }
    var displayTime = hours + ':' + minutes + period;

    //formatting type of cuisine
    var cuisineMap = {
      1: 'Mexican',
      2: 'Fast Food',
      3: 'Pizza',
      4: 'Sandwiches',
      5: 'Burgers',
      6: 'American',
      7: 'Barbecue',
      8: 'Diner',
      9: 'Chinese',
      10: 'Italian',
      11: 'Japanese',
      12: 'Vietnamese',
      13: 'Thai',
      14: 'Steakhouse',
      15: 'Indian',
      16: 'Other'
    }
    var displayCuisine = cuisineMap[this.props.cuisine];

    return (
      <a onClick={this.openModal}>
      <div className="deal col-md-6 col-sm-12" >
        <div className="dealLogoDiv">
          <img src={this.props.image_name} className='dealLogo' />
        </div>
        <div className="dealInfoDiv">
          <h3 className="dealDescription">
            {this.props.description}
          </h3>
          <div className="dealUrl">
            {this.props.url}
          </div>
          <div className="dealAddress">
            {this.props.address.split(',', 1)}
          </div>
          <div className="dealDate">
            {displayDate}
          </div>
          <div className="dealExpiration">
            {displayTime}
          </div>
        </div>  
      </div> 

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <div className="singleDealLogoDiv">
            <img src={this.props.image_name} className="singleDealLogo" />
          </div>
          <div className="dealInfoDiv">
            <h3 className="dealDescription">
              {this.props.description}
            </h3>
            <div className="restaurantName">
              {this.props.name}
            </div> 
            <div className='resDescription'>
              {this.props.res_description}
            </div> 
            <div className="dealUrl">
              {this.props.url}
            </div>
            <div className="dealAddress">
              {this.props.address.split(',', 1)}
            </div>
            <div className="cuisineType">
              {displayCuisine}
            </div>
            <div className="dealDate">
              {displayDate}
            </div>
            <div className="dealExpiration">
              {displayTime}
            </div>
            <Map {...this.props} />
            <Yelp {...this.props} />
          </div>
        </Modal>
      </a>
    );
  }
});

var AllDeals = React.createClass({
  loadDealsFromServer: function() {
    $.ajax({
      url: 'api/deals/getAll',
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: function(data) {
        console.log('data', data)
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("Error:", this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    this.loadDealsFromServer();
  },

  render: function() {
    return (
      <div className="dealBox">
        <h1>Today&#39;s Deals</h1>
        <DealList data={this.state.data} />
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
      <Dropdown />
        {dealNodes}
      </div>
    );
  }
});

var Dropdown = React.createClass({

  getInitialState: function() {
    return {cuisine: "Choose a cuisine"};    //SET TO WHATEVER IS RETURNED FROM PAST ENTRY IN DB
  },

  selectCuisine: function(e) {
    this.setState({cuisine: e.target.value});
  },

  render: function() {
    console.log("Current dropdown value:", this.state.cuisine)
    return (
      <form className="filterByCuisine">
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


const customStyles = {
   overlay : {
    position          : 'fixed',
    opacity: '30%'
  },
  content : {
    position                   : 'absolute',
    top                        : '120px',
    left                       : '120px',
    right                      : '120px',
    bottom                     : '120px',
    border                     : '10px solid #3300CF',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '50px'
 
  }
};

module.exports = AllDeals;
