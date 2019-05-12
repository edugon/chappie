const https = require('https'),
	config = require('../config.json'),
	consts = require('../utils/consts.js');

// returns GIF by keywords searching
exports.getByKeywords = function(phrase, limit) {
	let keywords = phrase.toString().replace(",", "+");
	let address = consts.hosts.GIPHY.url + 'search'
		+ '?api_key=' + config.tokens.giphy
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
	let address = consts.hosts.GIPHY.url + 'random'
		+ '?api_key=' + config.tokens.giphy
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