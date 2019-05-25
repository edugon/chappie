import https from 'https';
import * as consts from '../utils/consts';
import config from '../resources/config';

// returns GIF by keywords searching
export function getByKeywords(keywords, limit) {
	let address = consts.hosts.GIPHY.url + 'search'
		+ '?api_key=' + config.tokens.giphy
		+ '&q=' + keywords
		+ '&limit=' + (limit != null ? limit : 1);
	console.log('GET: ' + consts.hosts.GIPHY.url + 'search/?...');
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

// returns random GIF
export function getRandom(tag, rating, format) {
	let address = consts.hosts.GIPHY.url + 'random'
		+ '?api_key=' + config.tokens.giphy
		+ '&tag=' + (tag != null ? tag : '')
		+ '&rating=' + (rating != null ? rating : 'g')
		+ '&format=' + (format != null ? format : 'json');
	console.log('GET: ' + consts.hosts.GIPHY.url + 'random?...');
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