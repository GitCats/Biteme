var YelpInfo = React.createClass({ 
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

	var accessor = {
		consumerSecret: auth.consumerSecret,
		tokenSecret: auth.accessTokenSecret
	};

	parameters = [];
	parameters.push(['term', terms]);
	parameters.push(['location', near]);
	parameters.push(['callback', 'cb']);
	parameters.push(['oauth_consumer_key', auth.consumerKey]);
	parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
	parameters.push(['oauth_token', auth.accessToken]);
	parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

	var message = {
		'action': 'http://api.yelp.com/v2/search',
		'method': 'GET',
		'parameters': parameters
	};

	OAuth.setTimestampandNonce(message);
	OAuth.SignatureMethod.sign(message, accessor);
	var parameterMap = OAuth.getParameterMap(message.parameters);
	parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)

	$.ajax({
		'url': message.action,
		'data': parameterMap,
		'cache': true,
		'dataType': 'jsonp',
		'jsonCallback': 'cb',
		'success': function(data, textStats, XMLHttpRequest) {
			console.log(data)
		}
	})
	},

	render: function() {
		return (
			<div className="dealBox">
        		<h1>Deals</h1>
        		</Link>
        	<DealList data={this.state.data} />
      		</div>
			)
	}	
})
