import * as youtube from './clients/youtube';
import * as messages from './utils/messages';
import * as consts from './utils/consts';
import * as music from './commands/music';
import * as gifs from './commands/gifs';
import config from './resources/config';
import texts from './resources/texts';

// guesses member commands
export async function guessCommand(args, message, chappie) {
	switch (args[0]) {
		case 'gif':
			let keywords = args.splice(1);
			switch(keywords.length) {
				case 0:
					gifs.randomGif(message.channel);
					break;
				case 1:
					gifs.randomGif(message.channel, keywords);
					break;
				default:
					gifs.searchGif(message.channel, keywords);
					break;
			}
			break;
		case 'play':
			let input = args.splice(1);
			if (message.member.voiceChannel) {
				if (input.length > 0) {
					if (youtube.isValidUrl(input[0], consts.hosts.YOUTUBE.name)) {
						music.play(input[0], message.member.voiceChannel);
					} else {
						let url = music.search(input[0]);
						//music.play(url, message.member.voiceChannel);
					}
				}
			} else {
				messages.noVoiceMessage(message.channel);
			}
			break;
		case 'stop':
			if (message.member.voiceChannel) {
				music.stop();
			} else {
				messages.noVoiceMessage(message.channel);
			}
			break;
		case 'resume':
			if (message.member.voiceChannel) {
				music.resume();
			} else {
				messages.noVoiceMessage(message.channel);
			}
			break;
		case 'leave':
			if (message.member.voiceChannel) {
				music.leave(message.member.voiceChannel);
			} else {
				messages.noVoiceMessage(message.channel);
			}
			break;
		case 'say':
			message.channel.startTyping();
			let words = args.splice(1);
			words.join();
			let phrase = words.toString().replace(new RegExp(",", "g"), " ");
			message.channel.send(`${phrase} :grimacing:`);
			message.channel.stopTyping(true);
			break;
		case 'info':
			message.channel.startTyping();
			let embed = messages.createEmbed(
				null,
				chappie.user.username,
				chappie.user.avatarURL,
				consts.colors.DARK_GREEN,
				texts[config.lang].fields.about, null,
				texts[config.lang].footers.maintainer,
				chappie.user.avatarURL, consts.icons.INFO
			);
			embed.addField(texts[config.lang].titles.help, texts[config.lang].fields.help);
			embed.addField(texts[config.lang].titles.lang, texts[config.lang].fields.lang);
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