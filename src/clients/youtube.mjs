import https from 'https';
import * as consts from '../utils/consts';
import config from '../resources/config';

// checks if an url is valid
export function isValidUrl(url, host) {
	if (host === consts.hosts.YOUTUBE.name) {
		return url.match(consts.hosts.YOUTUBE.regex);
	}
	return false;
}

// returns Youtube video by keywords searching
export function getByKeywords(phrase, limit) {
	let keywords = phrase.toString().replace(",", "+");
	let address = consts.hosts.YOUTUBE.url + 'search'
		+ '?access_token=' + config.tokens.youtube
		+ '&part=' + keywords;
		//+ '&limit=' + (limit != null ? limit : 1);
	console.log('GET: ' + address);
	return new Promise(function (resolve, reject) {
		https.get(
			address,
			function (res) {
				res.setEncoding(consts.encoding.UTF_8);
				let strData = '';
				res.on('data', function (data) {
					strData += data; // weird
				});
				res.on('end', function () {
					let obj = JSON.parse(strData);
					resolve(obj);
				});
			}
		).on('error', function (error) {
			reject(Error(error));
		});
	});
}