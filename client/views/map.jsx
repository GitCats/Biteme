var React = require('react');


var Map = React.createClass({ 

	getInitialState: function() {
		console.log('mapprops', this.props)
		return {
			currentAddress: 'Austin, Texas',
			mapCoordinates: {
				lat: 30.268884,
				lng: -97.740520
			}
		}
	}, 

	componentDidMount: function() {
		console.log('props', this.props)
		this.componentDidUpdate();
	},

	componentDidUpdate: function() {
		console.log('mapprops', this.props)
		// var startingPoint;

		// GMaps.geocode({
  // 			address: this.props.address,
  // 			callback: function(results, status) {
  // 				if(status !== 'OK') {
  // 					console.log('error with gmaps')
  // 				}
  //   			if (status === 'OK') {
  //     				var latlng = results[0].geometry.location;
  //   			}
		// 	var map = new GMaps({
  //   			el: '#map',
  //   			lat: latlng.lat(),
  //   			lng: latlng.lng(),
  //   			zoom: 17,
  //   			zoomControl : true,
  //   			zoomControlOpt: {
  //       			style : 'SMALL',
  //       			position: 'TOP_LEFT'
  //   			},
  //   			panControl : true,
  // 			});
		// 	map.addMarker({ 
		// 		lat: latlng.lat(),
		// 		lng: latlng.lng()
		// 	})

		// 	map.drawRoute({
		// 		origin: [startingPoint.lat(), startingPoint.lng()],
		// 		destination: [latlng.lat(), latlng.lng()],
		// 		travelMode: 'driving',
		// 		strokeColor: '#05018f',
		// 		strokeOpacity: 0.6,
		// 		strokeWeight: 6
		// 	});
		// }
		// });

    GMaps.geocode({
      address: this.props.startingPoint,
      callback: function(results, status) {
        if (status == 'OK') {
          var address_from = results[0].geometry.location;
          var map = new GMaps({
    			el: '#map',
    			lat: address_from.lat(),
    			lng: address_from.lng(),
    			zoom: 17,
    			zoomControl : true,
    			zoomControlOpt: {
        			style : 'SMALL',
        			position: 'TOP_LEFT'
    			},
    			panControl : true,
  			});
          map.addMarker({
            lat: address_from.lat(),
            lng: address_from.lng()
          });
          map.addMarker({
            lat: 30.273980,
            lng: -97.799825
          });
        
      }
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

