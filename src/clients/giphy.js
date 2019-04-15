const https = require('https'),
	config = require('../config.json'),
	hostname = 'https://api.giphy.com/v1/gifs/';

// returns GIF by keywords searching
exports.getByKeywords = function(phrase, limit) {
	let keywords = phrase.toString().replace(",", "+");
	let address = hostname + 'search'
		+ '?api_key=' + config.giphy
		+ '&q=' + keywords
		+ '&limit=' + (limit != null ? limit : 1);
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

// returns random GIF
exports.getRandom = function(tag, rating, format) {
	let address = hostname + 'random'
		+ '?api_key=' + config.giphy
		+ '&tag=' + (tag != null ? tag : '')
		+ '&rating=' + (rating != null ? rating : 'g')
		+ '&format=' + (format != null ? format : 'json');
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