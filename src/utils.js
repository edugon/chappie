const Discord = require("discord.js");

exports.createRichEmbed = function(title, color, description, image, footer) {
	let embed = new Discord.RichEmbed()
		.setTitle(title)
		.setColor(color)
		.setDescription(description)
		.setImage(image)
		.setFooter(footer);
	return embed;
}