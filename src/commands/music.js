const youtube = require('../clients/youtube.js'),
	ytdl = require('ytdl-core');

exports.dispatcher = null;

// returns Youtube url by keywords searching
exports.search = function(keywords) {
	youtube.getByKeywords(keywords)
        .then(function(response) {
			// TODO return youtube url from response
			console.log(response);
			return '';
        })
        .catch(console.error);
}

// plays sound stream from Youtube url
exports.play = function(url, channel) {
   	channel.join()
        .then(function(connection) {
			let stream = ytdl(url, {filter:'audioonly'});
			exports.dispatcher = connection.playStream(stream, {passes: 3, seek: 0, volume: 0.5});
			console.log(exports.dispatcher);
			exports.dispatcher.on('error', console.error);
		})
		.catch(console.error);
}

// stops sound stream
exports.stop = function() {
	if(exports.dispatcher) {
    	exports.dispatcher.pause();
    }
}

// resumes sound stream
exports.resume = function() {
	if(exports.dispatcher && exports.dispatcher.paused) {
		exports.dispatcher.resume();
	}
}

// leaves channel and destroys sound stream
exports.leave = function(channel) {
	channel.leave();
	if(exports.dispatcher) {
		exports.dispatcher.destroy();
	}
}