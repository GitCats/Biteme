var React = require('react');


var Map = React.createClass({ 

	getInitialState: function() {
		return {
			currentAddress: 'Austin, Texas',
			mapCoordinates: {
				lat: 30.268884,
				lng: -97.740520
			}
		}
	}, 

	componentDidMount: function() {
		this.componentDidUpdate();
	},

	componentDidUpdate: function() {

		GMaps.geocode({
  			address: this.props.address,
  			callback: function(results, status) {
  				if(status !== 'OK') {
  					console.log('error with gmaps')
  				}
    			if (status === 'OK') {
      				var latlng = results[0].geometry.location;
    			}

			var map = new GMaps({
    			el: '#map',
    			lat: latlng.lat(),
    			lng: latlng.lng(),
    			zoom: 17,
    			zoomControl : true,
    			zoomControlOpt: {
        			style : 'SMALL',
        			position: 'TOP_LEFT'
    			},
    			panControl : true,
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

