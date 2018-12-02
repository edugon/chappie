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
	INFO: 'Type "!chappie info" to know more about me 😊';
}

exports.createEmbed = function(title, color, description, image, footer) {
	let embed = new Discord.RichEmbed()
		.setTitle(title)
		.setColor(color)
		.setDescription(description)
		.setImage(image)
		.setFooter(footer);
	return embed;
}