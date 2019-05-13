import { play, search, stop, resume, leave } from './commands/music';
import { noVoiceMessage, createEmbed } from './utils/messages';
import { searchGif, randomGif } from './commands/gifs';
import { hosts, colors, icons } from './utils/consts';
import { isValidUrl } from './clients/youtube';
import config from './resources/config';
import texts from './resources/texts';

// guesses member commands
export async function guessCommand(args, message, chappie) {
	switch(args[0]) {
        case 'gif':
        	let gifKeywords = args.splice(1);
        	if(gifKeywords.length > 0) {
        		searchGif(gifKeywords, message.channel);
        	} else {
        		randomGif(message.channel);
        	}
        break;
        case 'play':
        	let input = args.splice(1);
        	if(message.member.voiceChannel) {
	        	if(input.length > 0) {
	        		if(isValidUrl(input[0], hosts.YOUTUBE.name)) {
	        			play(input[0], message.member.voiceChannel);
	        		} else {
	        			let url = search(input[0]);
	        			//play(url, message.member.voiceChannel);
	        		}
	        	}
	        } else {
				noVoiceMessage(message.channel);
			}
        break;
        case 'stop':
			if(message.member.voiceChannel) {
        		stop();
        	} else {
		        noVoiceMessage(message.channel);
		    }
        break;
        case 'resume':
			if(message.member.voiceChannel) {
        		resume();
        	} else {
		        noVoiceMessage(message.channel);
		    }
        break;
        case 'leave':
			if(message.member.voiceChannel) {
        		leave(message.member.voiceChannel);
        	} else {
		        noVoiceMessage(message.channel);
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
            let embed = createEmbed(null, chappie.user.username, chappie.user.avatarURL, 
                colors.DARK_GREEN, texts[config.lang].fields.about, null, 
                texts[config.lang].footers.maintainer, chappie.user.avatarURL, icons.INFO)
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