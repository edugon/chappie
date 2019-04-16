const https = require('https'),
	config = require('../config.json'),
	hostname = 'https://www.googleapis.com/youtube/v3/';

// returns Youtube video by keywords searching
exports.getByKeywords = function(phrase, limit) {
	let keywords = phrase.toString().replace(",", "+");
	let address = hostname + 'search';
		//+ '?api_key=' + config.giphy
		//+ '&q=' + keywords
		//+ '&limit=' + (limit != null ? limit : 1);
	console.log('GET: ' + address);
	return new Promise(function(resolve, reject) {
		https.get(
			address,
			function(res) {
				res.setEncoding('utf8');
				let strData = '';
				res.on('data', function(data) {
                	strData += data; // weird
            	});
            	res.on('end', function() {
                	obj = JSON.parse(strData);
                	resolve(obj);
            	});
			}
		).on('error', function(error) {
			reject(Error(error));
		});
	});
}