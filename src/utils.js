const Discord = require("discord.js"),
	config = require('./config.json'),
	texts = require('./texts.json');

exports.colors = {
	DARK_GREEN: 'DARK_GREEN',
	DARK_RED: 'DARK_RED',
	DARK_GOLD: 'DARK_GOLD'
}

exports.icons = {
	INFO: 'http://www.myiconfinder.com/uploads/iconsets/256-256-92772c80d46c3d241a175d4ade309f88.png'
}

exports.gifs = {
	REGARDS: 'https://media2.giphy.com/media/pjZLhQIEx9dBe/giphy.gif',
	WALKING: 'https://media.giphy.com/media/KWjRQ4Zttlzb2/giphy.gif'
}

exports.hosts = {
	YOUTUBE: 'YOUTUBE'
}

exports.regex = {
	YOUTUBE: /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
}

// checks if an url is valid
exports.isValidUrl = function(url, host) {
	if(host === exports.hosts.YOUTUBE) {
		return (url.match(exports.regex.YOUTUBE)) ? true : false;
	}
	return false;
}

// returns an embedded message
exports.createEmbed = function(title, author, avatar, color, description, image, footer, thumbnail, icon) {
	let authorSay = author != null ? (author + texts[config.lang].titles.say) : null;
	let embed = new Discord.RichEmbed()
		.setTitle(title != null ? title : '')
		.setAuthor(authorSay != null ? authorSay : '', avatar != null ? avatar : '')
		.setColor(color != null ? color : '')
		.setDescription(description != null ? description : '')
		.setImage(image != null ? image : '')
		.setFooter(footer != null ? footer : '', icon != null ? icon : '')
		.setThumbnail(thumbnail != null ? thumbnail : '');
		//.setTimestamp();
	return embed;
}

// user is not in a voice channel
exports.noVoiceMessage = function(channel) {
	channel.startTyping();
	channel.send(texts[config.lang].fields.memberNotInChannel);
	channel.stopTyping(true);
}