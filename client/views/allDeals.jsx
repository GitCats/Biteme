//might not need all of these - only $ react, reactdom, auth, link from SO
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link
var Modal = require('react-modal');
var SingleDeal = require('./singleDeal.jsx');
var Mod = require('./modal.jsx');

var Deal = React.createClass({
  // getInitialState: function() {
  //   return { modalIsOpen: false };
  // },

  // openModal: function() {
  //   this.setState({ modalIsOpen: true});
  //   console.log(this.props)
  // },

  // closeModal: function() {
  //   this.setState({ modalIsOpen: false});
  // },

  openSingleDealView: function() {
    SingleDeal.openModal()
  },

  render: function() {
    return (
      <div className="deal col-md-6 col-sm-12">
        <div className="dealLogoDiv">
          <img src={this.props.image_name} className='dealLogo' onClick={this.openSingleDealView} />
        </div>
        <div className="dealInfoDiv">
          <h3 className="dealDescription">
            {this.props.description}
          </h3>
          <div className="restaurantName">
            {this.props.name}
          </div> 
          <div className="dealExpiration">
            {this.props.expiration}
          </div>
        </div>  
      </div>
    );
  }
});

var AllDeals = React.createClass({
  loadDealsFromServer: function() {
    $.ajax({
      url: '/api/getDeals',
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data)
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  // handleCommentSubmit: function(comment) {
  //   var comments = this.state.data;
  //   Optimistically set an id on the new comment. It will be replaced by an
  //   id generated by the server. In a production application you would likely
  //   not use Date.now() for this and would have a more robust system in place.
  //   comment.id = Date.now();
  //   var newComments = comments.concat([comment]);
  //   this.setState({data: newComments});
  //   $.ajax({
  //     url: this.props.url,
  //     dataType: 'json',
  //     type: 'POST',
  //     data: comment,
  //     success: function(data) {
  //       this.setState({data: data});
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       this.setState({data: comments});
  //       console.error(this.props.url, status, err.toString());
  //     }.bind(this)
  //   });
  // },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadDealsFromServer();
    // component.setState(data)


    // this.loadCommentsFromServer();
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
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
        <Deal description={deal.description} expiration={deal.expiration} image_name={deal.image_name} name={deal.name} key={deal.id}>
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

module.exports = AllDeals;
