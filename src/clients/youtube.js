const https = require('https'),
	config = require('../config.json'),
	consts = require('../utils/consts.js');

// checks if an url is valid
exports.isValidUrl = function(url, host) {
	if(host === consts.hosts.YOUTUBE.name) {
		return (url.match(consts.hosts.YOUTUBE.regex)) ? true : false;
	}
	return false;
}

// returns Youtube video by keywords searching
exports.getByKeywords = function(phrase, limit) {
	let keywords = phrase.toString().replace(",", "+");
	let address = consts.hosts.YOUTUBE.url + 'search'
		+ '?access_token=' + config.tokens.youtube
		+ '&part=' + keywords;
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