import * as giphy from '../clients/giphy';

// sends GIF by keywords searching
export function searchGif(keywords, channel) {
	giphy.getByKeywords(keywords)
		.then(function (response) {
			channel.send({ files: [response.data[0].images.downsized_medium.url] });
		})
		.catch(console.error);
}

// sends random GIF
export function randomGif(channel) {
	giphy.getRandom()
		.then(function (response) {
			channel.send({ files: [response.data.images.downsized_medium.url] });
		})
		.catch(console.error);
}