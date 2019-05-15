import https from 'https';
import * as consts from './consts';
import config from '../resources/config';

// oauth login
export function login(token) {
	let address = consts.hosts.OAUTH.url + 'auth'
        + '?client_id=' + config.credentials.client_id
        + '&redirect_uri=http://localhost:8080'
        + '&scope=https://www.googleapis.com/auth/youtube'
        + '&response_type=code'
        + '&access_type=offline';
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
                	let obj = JSON.parse(strData);
                	console.log(obj);
            	});
			}
		).on('error', function(error) {
			reject(Error(error));
		});
	});
}