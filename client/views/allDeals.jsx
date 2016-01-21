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
        hours = hours - 12;
          if(hours === 12) {
            period = 'am'
          } else {
            period = 'pm'
          } 
      }
    var displayTime = hours + ':' + minutes + period


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
          <div className="restaurantName">
            {this.props.name}
          </div> 
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
      url: 'api/getDeals',
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
        <h1>Deals</h1>
        <DealList data={this.state.data} />
      </div>
    );
  }
});

var DealList = React.createClass({
  render: function() {
    var dealNodes = this.props.data.map(function(deal) {
      return (
        <Deal day={deal.day} year={deal.year} month={deal.month} name={deal.name} url={deal.url} address={deal.address} description={deal.description} expiration={deal.expiration} image_name={deal.image_name} name={deal.name} key={deal.deal_id}>
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

// var ExampleGoogleMap = React.createClass({  
//     getDefaultProps: function () {
//         return {
//             initialZoom: 8,
//             mapCenterLat: 43.6425569,
//             mapCenterLng: -79.4073126,
//         };
//     },
//     componentDidMount: function (rootNode) {
//         var mapOptions = {
//             center: this.mapCenterLatLng(),
//             zoom: this.props.initialZoom
//         },
//         map = new google.maps.Map(ReactDOM.findDOMNode('.map-gic'), mapOptions);
//         var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});
//         this.setState({map: map});
//     },
//     mapCenterLatLng: function () {
//         var props = this.props;
//         return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
//     },
//     render: function () {
//         return (
//           <div className='map-gic'>HERE</div>
//         );
//     }
// });


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
