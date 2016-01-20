var YelpBox = React.createClass({ 
	getInitialState: function() {
		return { data: [] }
	},

	componentDidMount: function() {
		this.getInfo();
	},

	getInfo: function() {
	var auth = {
		consumerKey: 'QZ9prikCwUyQMVk4c-anaw',
		consumerSecret: '8X_LB8xY9vKoYWu-OYDl8c0RrE0',
		accessToken: 'H4fzzH5pnHTyK2rQ2-gSEaWOhnNGA-Wb',
		accessTokenSecret: '5YpF6m4zVOmEHa6bmpGeIYxEEqw',
		serviceProvider: {
			signatureMethod: 'HMAC-SHA1'
		}
	};
	var terms = 'Franklin\'s Barbecue';
	var near = 'Austin, TX';
	var limit = 1;

	var accessor = {
		consumerSecret: auth.consumerSecret,
		tokenSecret: auth.accessTokenSecret
	};

	parameters = [];
	parameters.push(['term', terms]);
	parameters.push(['location', near]);
	parameters.push(['callback', 'cb']);
	parameters.push(['limit', limit]);
	parameters.push(['oauth_consumer_key', auth.consumerKey]);
	parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
	parameters.push(['oauth_token', auth.accessToken]);
	parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

	var message = {
		'action': 'http://api.yelp.com/v2/search',
		'method': 'GET',
		'parameters': parameters
	};

OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);
var parameterMap = OAuth.getParameterMap(message.parameters);
parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
console.log(parameterMap);
	$.ajax({
		'url': 'http://api.yelp.com/v2/search',
		'data': parameterMap,
		'cache': true,
		'dataType': 'jsonp',
		'headers': auth,
		'success': function(data, textStats, XMLHttpRequest) {
			console.log('yelpdata', data)
			this.setState({ data: data.businesses[0] })
		}.bind(this),
		error: function(xhr, status, err) {
			console.error('Error:', err)
		}.bind(this)
	});
},
	render: function() {
		return (
			<div className='yelpBox'>
				<Yelp data={this.state.data} />
			</div>			
		);
	}
});



var Yelp = React.createClass({
	render: function() {
		return (
		<div className='yelpBox'>
			<div className='ratingStars'>
				<a href={this.props.data.url} target='_blank'>
					<img src={this.props.data.rating_img_url_large} />
				</a>
				<div className="snippetText">
					{this.props.data.snippet_text}	
				</div>	
				<a href={this.props.data.url} target='_blank'>
					<p><i>Read More</i></p>
				</a>
			</div>
		</div>
		)
	}

});

module.exports = YelpBox;



