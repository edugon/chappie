const config = require('./config.json'),
	texts = require('./texts.json'),
	utils = require('./utils.js'),
	gifs = require('./commands/gifs.js'),
	music = require('./commands/music.js');

// guesses member commands
exports.guessCommand = async function(args, message, chappie) {
	switch(args[0]) {
        case 'gif':
        	let gifKeywords = args.splice(1);
        	if(gifKeywords.length > 0) {
        		gifs.searchGif(gifKeywords, message.channel);
        	} else {
        		gifs.randomGif(message.channel);
        	}
        break;
        case 'play':
        	let input = args.splice(1);
        	if(message.member.voiceChannel) {
	        	if(input.length > 0) {
	        		if(utils.isValidUrl(input[0], utils.hosts.YOUTUBE)) {
	        			music.play(input[0], message.member.voiceChannel);
	        		} else {
	        			let url = music.search(input[0]);
	        			music.play(url, message.member.voiceChannel);
	        		}
	        	}
	        } else {
				utils.noVoiceMessage(message.channel);
			}
        break;
        case 'stop':
			if(message.member.voiceChannel) {
        		music.stop();
        	} else {
		        utils.noVoiceMessage(message.channel);
		    }
        break;
        case 'resume':
			if(message.member.voiceChannel) {
        		music.resume();
        	} else {
		        utils.noVoiceMessage(message.channel);
		    }
        break;
        case 'leave':
			if(message.member.voiceChannel) {
        		music.leave(message.member.voiceChannel);
        	} else {
		        utils.noVoiceMessage(message.channel);
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
            let embed = utils.createEmbed(null, chappie.user.username, chappie.user.avatarURL, 
                utils.colors.DARK_GREEN, texts[config.lang].fields.about, null, 
                texts[config.lang].footers.maintainer, chappie.user.avatarURL, utils.icons.INFO)
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