const Discord = require("discord.js"),
	config = require('../config.json'),
    texts = require('../texts.json');

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