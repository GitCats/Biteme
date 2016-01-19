// var GoogleMap = require('react-google-maps').GoogleMap;
// var GoogleMapLoader = require('react-google-maps').GoogleMapLoader;
// var GoogleMapMarker = require('react-google-maps').GoogleMapMarker;
// var canUseDom = require('can-use-dom')

var React = require('react');
var Gmaps = require('../../gmaps.js')


var Map = React.createClass({ 

	getInitialState: function() {
		return {
			currentAddress: 'Paris, France',
			mapCoordinates: {
				lat: 48.856614,
				lng: 2.3522219
			}
		}
	}, 

	componentDidMount: function() {
		this.componentDidUpdate();
	},

	getMapCoordinates: function() {
		GMaps.geocode({
  			address: '6102 NW 24th Lane, Gainesville, FL 32606',
  			callback: function(results, status) {
    			if (status ==='OK') {
      				var latlng = results[0].geometry.location;
      				this.setState({ 
      					currentAddress: results[0].formatted_address,
      					mapCoordinates: {
     						lat: latlng.lat(),
     						lng: latlng.lng()
    					}
    				})
  			}
  		}
		})
	},

	componentDidUpdate: function() {

		GMaps.geocode({
  			address: '900 E 11th St, Austin, TX 78702',
  			callback: function(results, status) {
    			if (status == 'OK') {
      				var latlng = results[0].geometry.location;
    			}

			var map = new GMaps({
    			el: '#map',
    			lat: latlng.lat(),
    			lng: latlng.lng(),
    			zoom: 15,
    			zoomControl : true,
    			zoomControlOpt: {
        			style : 'SMALL',
        			position: 'TOP_LEFT'
    			},
    			panControl : false,
  			});
			map.addMarker({ 
				lat: latlng.lat(),
				lng: latlng.lng()
			})
		}
		});
	},

	render: function() {
		return (
			<div className='map-holder'>
			<div id='map'></div>
			</div>
			)
		}
	});

	

module.exports = Map;