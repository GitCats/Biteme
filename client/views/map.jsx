var React = require('react');


var Map = React.createClass({ 

	// getInitialState: function() {
	// 	console.log('mapprops', this.props)
	// 	return {
	// 		currentAddress: 'Austin, Texas',
	// 		mapCoordinates: {
	// 			lat: 30.268884,
	// 			lng: -97.740520
	// 		}
	// 	}
	// }, 

	// componentDidMount: function() {
	// 	console.log('props', this.props)
	// 	this.componentDidUpdate();
	// },

	// componentDidUpdate: function() {
	// 	console.log('mapprops', this.props)
	// 	// var startingPoint;
 //    var origin = this.props.startingPoint;

 //    var originlat;
 //    var originlng;

	// 	GMaps.geocode({
 //  			address: this.props.address,
 //  			callback: function(results, status) {
 //  				if(status !== 'OK') {
 //  					console.log('error with gmaps')
 //  				}
 //    			if (status === 'OK') {
 //      				var latlng = results[0].geometry.location;
 //              var lat = latlng.lat();
 //              var lng = latlng.lng()
 //    			}
	// 		var map = new GMaps({
 //    			el: '#map',
 //    			lat: latlng.lat(),
 //    			lng: latlng.lng(),
 //    			zoom: 14,
 //    			zoomControl : true,
 //    			zoomControlOpt: {
 //        			style : 'SMALL',
 //        			position: 'TOP_LEFT'
 //    			},
 //    			panControl : true,
 //  			});
	// 		map.addMarker({ 
	// 			lat: latlng.lat(),
	// 			lng: latlng.lng()
	// 		})

 //      if(origin) {
 //        GMaps.geocode({ 
 //          address: origin,
 //          callback: function(results, status) {
 //            if(status !== 'OK') {
 //              console.log('error with gmaps on')
 //            }
 //            if(status === 'OK') {
 //              var origin = results[0].geometry.location;
 //              originlat = origin.lat();
 //              originlng = origin.lng();
 //            }
 //            map.addMarker({
 //              lat: originlat,
 //              lng: originlng
 //            })
 //            map.drawRoute({
 //              origin: [originlat, originlng],
 //              destination: [lat, lng],
 //              travelMode: 'driving',
 //              strokeColor: '#05018f',
 //              strokeOpacity: 0.9,
 //              strokeWeight: 6
 //            })
 //          }
 //        })
 //      }
 //    }
 //  })
 //  },

	render: function() {
		return (
			<div className='map-holder'>
			<div id='map'></div>
			</div>
			)
		}
	});

module.exports = Map;

