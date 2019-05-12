import { getByKeywords, getRandom } from '../clients/giphy';

// sends GIF by keywords searching
export function searchGif(keywords, channel) {
	getByKeywords(keywords)
        .then(function(response) {
            channel.send({files: [response.data[0].images.downsized_medium.url]});
        })
        .catch(console.error);
}

// sends random GIF
export function randomGif(channel) {
	getRandom()
        .then(function(response) {
            channel.send({files: [response.data.images.downsized_medium.url]});
        })
        .catch(console.error);
}