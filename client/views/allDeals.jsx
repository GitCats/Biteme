//might not need all of these - only $ react, reactdom, auth, link from SO
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
// var Router = require('react-router').Router;
// var Route = require('react-router').Route;
// var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;
var Modal = require('react-modal');
// var Maps = require('google-maps')
var Map = require('./map.jsx');
var Yelp = require('./yelpinfo.jsx');


var Deal = React.createClass({
  getInitialState: function() {
    return { modalIsOpen: false,
             date: ''
           };
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
        hours = hours - 12
          if(hours === 12) {
            period = 'am'
          } else {
            period = 'pm'
          }
          if(hours === 00) {
            hours = 12;
          }
      }
    var displayTime = hours + ':' + minutes + period;

    //1200 is noon or 12:00pm
    //2400 is midnight or 12:00am

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
            {this.props.address.split(",", 1)}
          </div>
          <div className="dealExpiration">
            <h3>{displayTime}</h3>
          </div>
          <div>
            {this.props.destination}
          </div>
          <div>
            {this.props.distance}
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
              <a href={this.props.url}>{this.props.url}</a>
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
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("Error:", this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {data: []}
  },

  componentDidMount: function() {
    this.loadDealsFromServer();
  },

  render: function() {
    return (
      <div className="dealBox">
        <DealList data={this.state.data} />
      </div>
    );
  }
});

var DealList = React.createClass({
  getInitialState: function() {
    return {
      cuisine_id: '',
      expirationDate: 1,
      startingPoint: '',
      destinations: '',
      updateCuisineId: function(id) {
        this.setState({ cuisine_id: id})
      },
      updateExpiration: function(exp) {
        this.setState({ expirationDate: exp})
      },
      filterByProximity: function(startingPoint) {
        this.filterByProximity(startingPoint)
      }
    }
  },

  componentWillMount: function() {
    this.setState({ expirationDate: 1})
  },

  filterByCuisine: function(value) {
    if(value.cuisine_id == this.state.cuisine_id) {
      return true;
    } else {
        return false;
    }
  },

  filterByExpiration: function(value) {
    //find milliseconds of today at midnight
    var temptoday = new Date();
    var year = temptoday.getFullYear();
    var month = temptoday.getMonth();
    var date = temptoday.getDate();
    var today = +new Date(year, month, date, 23, 59, 59)

    //find milliseconds of tomorrow at midnight
    var tomorrowInMilliseconds = today + 86400000;

    //find milliseconds of 7 days from now at midnight
    var oneWeekInMilliseconds = today + 604800000;

    //getting the time expiration of the deals
    var expHour;
    var expMin;
    if(value.expiration.toString().length === 4) {
      expHour = value.expiration.toString().substr(0, 2)
      expMin = value.expiration.toString().slice(-2)
    }
    if(value.expiration.toString().length === 3) {
      expHour = parseInt(value.expiration.toString().substr(0, 1))
      expMin = parseInt(value.expiration.toString().slice(-2))
    }
    //milliseconds of when deal will expire
    var date = +new Date(value.year, value.month-1, value.day, expHour, expMin, 59)

    if(this.state.expirationDate === 1) {
      if(date < today) {
        return true
      } else {
        return false;
      }
    }

    if(this.state.expirationDate === 2) {
      if(date < tomorrowInMilliseconds && date > today){
      return true;
    } else {
      return false;
    }
  }

    if(this.state.expirationDate === 3) {
      if(date < oneWeekInMilliseconds) {
        return true;
      } else {
        return false;
      }
    }
  },

 filterByProximity: function(startingPoint) {

  var array = [];
  var destinations = function(obj) {
    for(var key in obj) {
      for(var i=0; i<obj[key].length; i++) {
        var address = obj[key][i].address;
        var formatAddress = address.replace(/\s/g, '+')
        array.push(formatAddress)
      }
    }
  }
  destinations(this.props)

  var allDestinations = array.join('|')
  var data = {
    startingPoint: startingPoint,
    destinations: allDestinations
  }

  var results;
  $.ajax({
      url: 'api/deals/filterByProximity',
      type: 'POST',
      data: data,
      success: function(data) {
        results = JSON.parse(data)
        console.log('results', results)
        console.log('test', allDestinations)
        var distancesToDestinationsMap = {};
        var distances = results.rows[0].elements;
        var destinations = results.destination_addresses
        var destinationsArray;
        // for(var i=0; i<distances.length; i++) {
        //   for(var key in distances[i]) {
        //     console.log('key', distances[i].distance.text)
        //   }
        // }
        // console.log('distances', distances)
        // console.log('destinations', destinations)
        for(var i=0; i<destinations.length; i++) {
          var x=destinations[i];
          for(var j=i; j<distances.length; j++) {
            for(var key in distances[j]) {
              var y = distances[i].distance.text
            }
            distancesToDestinationsMap[x] = y;
            }
          }
          console.log('distancesToDestinationsMap', distancesToDestinationsMap)
        this.setState({ destinations: distancesToDestinationsMap})
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('Error:', err)
      }.bind(this)
    })
  },


  render: function() {
    var dealsToUse;
    if(this.state.expirationDate !== '') {
      dealsToUse = this.props.data.filter(this.filterByExpiration)
      if(this.state.cuisine_id !== '') {
        dealsToUse = dealsToUse.filter(this.filterByCuisine)
      }
    } else {
      dealsToUse = this.props.data;
    }
    if(this.state.destinations !== ''){
      for(var key in this.state.destinations) {
        var x = key.substr(0, key.length-5);
        console.log('x', x)
        console.log('google maps address', x)
        console.log('currently displayed deals', dealsToUse)
        console.log('deals from database', this.props)
        for(var i=0; i<dealsToUse.length; i++) {
          var address = dealsToUse[i].address;
          var addressSplit = address.split(' ')
          var streetNumber = new RegExp(addressSplit[0]);
          var zipCode = new RegExp(address.split[address.length-1]);
          console.log('streetnumber', streetNumber)
          console.log('input address', address)
          if(streetNumber.test(x) && zipCode.test(x)) {
            console.log('match')
            dealsToUse[i].distance = this.state.destinations[key]

          }
        }
      }
    }

    var verifyAddress = function(array) {
      var count;
      for(var i=0; i<array.length; i++) {
        var regex = array[i];
        if(address.test(regex)) {
          count++;
        }
      }
      if(count >=3) {
        return true;
      } else {
        return false;
      }
    }

    var dealNodes = dealsToUse.map(function(deal) {
      return (
        <Deal {...this.props}
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
              key={deal.deal_id}
              distance={deal.distance}>
        </Deal>
      );
    });
    return (
      <div className="dealList">
      <CuisineDropdown updateCuisineId={this.state.updateCuisineId.bind(this)} />
      <ExpirationDropdown updateExpiration={this.state.updateExpiration.bind(this)} />
      <SearchBar {...this.props} filterByProximity={this.state.filterByProximity.bind(this)} />
        {dealNodes}
      </div>
    );
  }
});

var CuisineDropdown = React.createClass({

  getInitialState: function() {
    return {cuisine: "Choose a cuisine"};   //SET TO WHATEVER IS RETURNED FROM PAST ENTRY IN DB
  },

  selectCuisine: function(e) {
    var id = e.target.value;
    this.props.updateCuisineId(id)
  },

  render: function() {
    return (
      <form className="filterByCuisine">
        <select onChange={this.selectCuisine}>
          <option value="">-Choose your cuisine-</option>
          <option value="">All cuisines</option>
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

var ExpirationDropdown = React.createClass({
  selectExpiration: function(e) {
    var expirationDate = e.target.value;
    var exp = parseInt(expirationDate)
    this.props.updateExpiration(exp)
  },

  render: function() {
    return (
      <form className="filterByExpiration">
        <select onChange={this.selectExpiration}>
          <option value="1">Today</option>
          <option value="2">Tomorrow</option>
          <option value="3">This Week</option>
        </select>
      </form>
    );
  }
});

var SearchBar = React.createClass({
   filterByProximity: function(e) {
    // console.log('here')
    e.preventDefault();
    var startingPoint = $('#address').val()
    // console.log(startingPoint)
    this.props.filterByProximity(startingPoint)
  },

  render: function() {
    return (
      <form className='searchBar' onSubmit={this.filterByProximity} >
        <input type='text' name='address' id='address'></input>
        <input type='submit' className='searchButton' value='search'></input>
      </form>
      )
  }

})


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

//grab the input from the search bar
//call a function in deal list with that value
//makes a call to distance api
