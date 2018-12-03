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

exports.createEmbed = function(title, author, avatar, color, description, image, 
	footer, thumbnail, icon) {
	let authorSay = null;
	if(author != null) {
		authorSay = author + texts[config.lang].titles.say;
	}
	let embed = new Discord.RichEmbed()
		.setTitle(title != null ? title : '')
		.setAuthor(authorSay != null ? authorSay : '', avatar != null ? avatar : '')
		.setColor(color != null ? color : '')
		.setDescription(description != null ? description : '')
		.setImage(image != null ? image : '')
		.setFooter(footer != null ? footer : '', icon != null ? icon : '')
		.setThumbnail(thumbnail != null ? thumbnail : '')
		.setTimestamp();

	return embed;
}