import * as youtube from './clients/youtube';
import * as messages from './utils/messages';
import * as consts from './utils/consts';
import * as music from './commands/music';
import * as gifs from './commands/gifs';
import config from './resources/config';
import texts from './resources/texts';

const musicChannel = 'music';

// guesses member commands that are related to chappie
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
			if (checkCommand(args[0])) {
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
					messages.send(message.channel, texts[config.lang].fields.memberNotInChannel);
				}
			} else {
				messages.send(message.channel, texts[config.lang].fields.wrongChannelCommand + ' (' + musicChannel + ')');
			}
			break;
		case 'stop':
			if (checkCommand(args[0])) {
				if (message.member.voiceChannel) {
					music.stop();
				} else {
					messages.send(message.channel, texts[config.lang].fields.memberNotInChannel);
				}
			} else {
				messages.send(message.channel, texts[config.lang].fields.wrongChannelCommand + ' (' + musicChannel + ')');
			}
			break;
		case 'resume':
			if (checkCommand(args[0])) {
				if (message.member.voiceChannel) {
					music.resume();
				} else {
					messages.send(message.channel, texts[config.lang].fields.memberNotInChannel);
				}
			} else {
				messages.send(message.channel, texts[config.lang].fields.wrongChannelCommand + ' (' + musicChannel + ')');
			}
			break;
		case 'leave':
			if (checkCommand(args[0])) {
				if (message.member.voiceChannel) {
					music.leave(message.member.voiceChannel);
				} else {
					messages.send(message.channel, texts[config.lang].fields.memberNotInChannel);
				}
			} else {
				messages.send(message.channel, texts[config.lang].fields.wrongChannelCommand + ' (' + musicChannel + ')');
			}
			break;
		case 'say':
			let words = args.splice(1);
			words.join();
			let phrase = words.toString().replace(new RegExp(',', 'g'), ' ');
			messages.send(phrase + ' :grimacing:');
			break;
		case 'info':
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
			messages.send(embed);
			break;
		case 'español':
			config.lang = 'spanish';
			messages.send(message.channel, texts[config.lang].fields.language);
			break;
		case 'english':
			config.lang = 'english';
			messages.send(message.channel, texts[config.lang].fields.language);
			break;
		default:
			messages.send(message.channel, texts[config.lang].fields.wrongInput);
			messages.send(message.channel, texts[config.lang].footers.info);
			break;
	}
}

// checks usage of member commands (only music for the moment)
export function checkCommand(command) {
	return consts.validCommands.MUSIC.indexOf(command) && message.channel.name === musicChannel;
}