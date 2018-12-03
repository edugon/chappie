const Discord = require('discord.js'),
	logger = require('winston'),
	chappie = new Discord.Client(),
	config = require('./config.json'),
    texts = require('./texts.json'),
    utils = require('./utils.js'),
	defaultChannel = 'development'; // dev channel

chappie.on('ready', function() {
    console.log('chappie is listening');
    console.log({users: chappie.users.size, channels: chappie.channels.size});
});

chappie.on('guildCreate', function(guild) {
  	// this event triggers when chappie joins a guild.
    console.log('new guild joined');
    console.log({guildName: guild.name, guildID: guild.id, members: guild.memberCount});
  	let channel = guild.channels.find(ch => ch.name === defaultChannel);
  	channel.startTyping();
    let embed = utils.createEmbed(null, chappie.user.username, chappie.user.avatarURL,
        utils.colors.DARK_GREEN, texts[config.lang].fields.helloWorld, utils.gifs.REGARDS, 
        texts[config.lang].footers.info, null, utils.icons.INFO);
    channel.stopTyping(true);
    channel.send(embed);
});

chappie.on('guildDelete', function(guild) {
  	// this event triggers when chappie is removed from a guild.
  	console.log('removed from guild');
    console.log({guildName: guild.name, guildID: guild.id});
  	let channel = guild.channels.find(ch => ch.name === defaultChannel);
  	channel.startTyping();
    let embed = utils.createEmbed(null, chappie.user.username, chappie.user.avatarURL, 
        utils.colors.DARK_RED, texts[config.lang].fields.farewell, utils.gifs.WALKING);
    channel.stopTyping(true);
    channel.send(embed);
});

chappie.on('guildMemberAdd', function(member) {
    // this event triggers when new member is added to the guild.
    console.log('new user');
    console.log({member: member.displayName, guild: member.guild.name});
    let channel = member.guild.channels.find(ch => ch.name === defaultChannel);
    if(channel) {
        channel.startTyping();
        let embed = utils.createEmbed(null, chappie.user.username, chappie.user.avatarURL, 
            utils.colors.DARK_GREEN, `Hello World! ${member} ` + texts[config.lang].fields.memberAdd, 
            utils.gifs.REGARDS, texts[config.lang].footers.info, null, utils.icons.INFO);
        channel.stopTyping(true);
        channel.send(embed);
    }
});

function guessResponse(args, message) {
	switch(args[0]) {
        case 'say':
            let phrase = args.splice(1);
            phrase.join();
            phrase = phrase.toString().replace(",", " ");
            message.channel.startTyping();
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
            message.channel.stopTyping(true);
            message.channel.send(embed);
        break;
        case 'español':
            console.log('change language to spanish');
            message.channel.startTyping();
            config.lang = 'spanish';
            message.channel.send(texts[config.lang].fields.language);
            message.channel.stopTyping(true);
        break;
        case 'english':
            console.log('change language to english');
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

chappie.on('message', function(message) {
	// chappie needs to know if it will execute a command
    // it will listen for messages that will start with `!`
    if (message.content.substring(0, 1) == '!') {
        let args = message.content.substring(1).split(' ');
        let cmd = args[0];
        args = args.splice(1);
        args = args.filter(Boolean); // remove empty elements
        switch(cmd) {
            // !chappie
            case 'chappie':
                if(args.length > 0) {
                    guessResponse(args, message);
                } else {
                    // default message
                	message.channel.startTyping();
                	let embed = utils.createEmbed(null, chappie.user.username, 
                        chappie.user.avatarURL, utils.colors.DARK_GREEN, 
                        'Heey yooo ' + message.author + '! ' + texts[config.lang].titles.regards, 
                        utils.gifs.REGARDS, texts[config.lang].footers.info, null, utils.icons.INFO);
                    message.channel.stopTyping(true);
                    message.channel.send(embed);
                }
            break;
         }
     }
});

chappie.login(config.token);