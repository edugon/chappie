const Discord = require("discord.js"),
	config = require('./config.json'),
	texts = require('./texts.json'),
	giphy = require('./clients/giphy.js'),
	youtube = require('./clients/youtube.js'),
	ytdl = require('ytdl-core');

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

// guesses member message.
exports.guessMessage = async function(args, message, chappie) {
	switch(args[0]) {
        case 'gif':
        	let gifKeywords = args.splice(1);
        	if(gifKeywords.length > 0) {
        		giphy.getByKeywords(gifKeywords)
            	.then(function(response) {
            		message.channel.send({files: [response.data[0].images.downsized_medium.url]});
            	})
            	.catch(function(error) {
                	console.error(error);
            	});
        	} else {
        		giphy.getRandom()
            	.then(function(response) {
            		message.channel.send({files: [response.data.images.downsized_medium.url]});
            	})
            	.catch(function(error) {
                	console.error(error);
            	});
        	}
        break;
        case 'play':
        	let input = args.splice(1);
        	if(input.length > 0) {
        		// check member is currently in voice channel
        		if(message.member.voiceChannel) {
        			message.member.voiceChannel.join()
        				.then(function(connection) {
        					if(exports.isValidUrl(input[0], exports.hosts.YOUTUBE)) {
        						const stream = ytdl(input[0], {filter:'audioonly'});
			        			const dispatcher = connection.playStream(stream, {passes: 3, seek: 0, volume: 0.5});
				        	} else {
					        	//youtube.getByKeywords(input)
				        	}
        				})
        				.catch(function(error) {
			                console.error(error);
			            });
        		} else {
        			message.channel.startTyping();
        			message.channel.send(texts[config.lang].fields.memberNotInChannel);
        			message.channel.stopTyping(true);
        		}
        	}
        break;
        case 'stop':
        	if(message.member.voiceChannel) {
        		if(dispatcher) {
        			dispatcher.pause();
        		}
        	} else {
        		message.channel.startTyping();
        		message.channel.send(texts[config.lang].fields.memberNotInChannel);
        		message.channel.stopTyping(true);
        	}
        break;
        case 'resume':
        	if(message.member.voiceChannel) {
        		if(dispatcher) {
        			dispatcher.resume();
        		}
        	} else {
        		message.channel.startTyping();
        		message.channel.send(texts[config.lang].fields.memberNotInChannel);
        		message.channel.stopTyping(true);
        	}
        break;
        case 'disconnect':
        	if(message.member.voiceChannel) {
        		message.member.voiceChannel.leave();
        		if(dispatcher) {
        			dispatcher.destroy();
        		}
        	} else {
        		message.channel.startTyping();
        		message.channel.send(texts[config.lang].fields.memberNotInChannel);
        		message.channel.stopTyping(true);
        	}
        break;
        case 'say':
        	message.channel.startTyping();
        	let keywords = args.splice(1);
            keywords.join();
            let phrase = keywords.toString().replace(new RegExp(",", "g"), " ");
            message.channel.send(`${phrase} :grimacing:`);
            message.channel.stopTyping(true);
        break;
        case 'info':
        	message.channel.startTyping();
            let embed = exports.createEmbed(null, chappie.user.username, chappie.user.avatarURL, 
                exports.colors.DARK_GREEN, texts[config.lang].fields.about, null, 
                texts[config.lang].footers.maintainer, chappie.user.avatarURL, exports.icons.INFO)
            .addField(texts[config.lang].titles.help, texts[config.lang].fields.help)
            .addField(texts[config.lang].titles.lang, texts[config.lang].fields.lang);
            message.channel.send(embed);
            message.channel.stopTyping(true);
        break;
        case 'español':
        	message.channel.startTyping();
            config.lang = 'spanish';
            message.channel.send(texts[config.lang].fields.language);
            message.channel.stopTyping(true);
        break;
        case 'english':
        	message.channel.startTyping();
            config.lang = 'english';
            message.channel.send(texts[config.lang].fields.language);
            message.channel.stopTyping(true);      
        break;
        default:
        	message.channel.startTyping();
            message.channel.send(texts[config.lang].fields.wrongInput);
            message.channel.send(texts[config.lang].footers.info);
            message.channel.stopTyping(true);
        break;
    }
}