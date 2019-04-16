const giphy = require('../clients/giphy.js');

// sends GIF by keywords searching
exports.searchGif = function(keywords, channel) {
	giphy.getByKeywords(keywords)
        .then(function(response) {
            channel.send({files: [response.data[0].images.downsized_medium.url]});
        })
        .catch(console.error);
}

// sends random GIF
exports.randomGif = function(channel) {
	giphy.getRandom()
        .then(function(response) {
            channel.send({files: [response.data.images.downsized_medium.url]});
        })
        .catch(console.error);
}