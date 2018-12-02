const https = require('https'),
	hostname = 'https://api.steampowered.com';

exports.getNews = function(appID, count, maxlength) {
	return new Promise(function(resolve, reject) {
		let format = 'json';
		https.get(hostname + '/ISteamNews/GetNewsForApp/v0002/?appid=' 
		+ appID + '&count=' + count + '&maxlength' + maxlength + '&format=' 
		+ format, function(res) {
			res.on('data', function(data) {
				resolve(JSON.parse(data).appnews);
			});
		}).on('error', function(error) {
			reject(Error(error));
		});
	});
}