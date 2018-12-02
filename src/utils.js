const Discord = require("discord.js");

exports.colors = {
	DARK_GREEN: 'DARK_GREEN',
	DARK_RED: 'DARK_RED',
	DARK_GOLD: 'DARK_GOLD'
}

exports.gifs = {
	REGARDS: 'https://media2.giphy.com/media/pjZLhQIEx9dBe/giphy.gif',
	WALKING: 'https://media.giphy.com/media/KWjRQ4Zttlzb2/giphy.gif'
}

exports.footers = {
	INFO: 'Type "!chappie info" to know more about me 😊',
	WIP: 'This may change in the future ☝',
	MAINTAINER: 'I have been developed by eduu <shockeR>'
}

exports.createEmbed = function(title, author, avatar, color, description, image, 
	footer, thumbnail) {
	let embed = new Discord.RichEmbed()
		.setTitle(title != null ? title : '')
		.setAuthor(author != null ? author + ' says:' : '', avatar != null ? avatar : '')
		.setColor(color != null ? color : '')
		.setDescription(description != null ? description : '')
		.setImage(image != null ? image : '')
		.setFooter(footer != null ? footer : '')
		.setThumbnail(thumbnail != null ? thumbnail : '')
		.setTimestamp();

	return embed;
}