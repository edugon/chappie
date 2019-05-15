import ytdl from 'ytdl-core';
import * as youtube from '../clients/youtube';

export const dispatcher = null;

// returns Youtube url by keywords searching
export function search(keywords) {
	youtube.getByKeywords(keywords)
        .then(function(response) {
			// TODO return youtube url from response
			console.log(response);
			return '';
        })
        .catch(console.error);
}

// plays sound stream from Youtube url
export function play(url, channel) {
   	channel.join()
        .then(function(connection) {
			let stream = ytdl(url, {filter:'audioonly'});
			exports.dispatcher = connection.playStream(stream, {passes: 3, seek: 0, volume: 0.5});
			console.log(dispatcher);
			dispatcher.on('error', console.error);
		})
		.catch(console.error);
}

// stops sound stream
export function stop() {
	if(dispatcher) {
    	dispatcher.pause();
    }
}

// resumes sound stream
export function resume() {
	if(dispatcher && dispatcher.paused) {
		dispatcher.resume();
	}
}

// leaves channel and destroys sound stream
export function leave(channel) {
	channel.leave();
	if(dispatcher) {
		dispatcher.destroy();
	}
}