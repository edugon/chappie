const Discord = require('discord.js'),
	logger = require('winston'),
	chappie = new Discord.Client(),
	config = require('./config.json'),
	texts = require('./texts.json'),
	utils = require('./utils.js'),
	giphy = require('./clients/giphy.js'),
	defaultChannel = 'development'; // dev channel

// this event triggers when chappie is ready.
chappie.on('ready', function() {
	console.log({users: chappie.users.size, channels: chappie.channels.size});
	console.log('chappie is listening');
});

// this event triggers when chappie joins a guild.
chappie.on('guildCreate', function(guild) {
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

// this event triggers when chappie is removed from a guild.
chappie.on('guildDelete', function(guild) {
  	console.log('removed from guild');
    console.log({guildName: guild.name, guildID: guild.id});
  	let channel = guild.channels.find(ch => ch.name === defaultChannel);
  	channel.startTyping();
    let embed = utils.createEmbed(null, chappie.user.username, chappie.user.avatarURL, 
        utils.colors.DARK_RED, texts[config.lang].fields.farewell, utils.gifs.WALKING);
    channel.stopTyping(true);
    channel.send(embed);
});

// this event triggers when new member is added to the guild.
chappie.on('guildMemberAdd', function(member) {
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

// this event triggers when member sends a message.
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

// this function guesses member messages.
function guessResponse(args, message) {
	message.channel.startTyping();
	switch(args[0]) {
        case 'say':
        	let keywords = args.splice(1);
            keywords.join();
            let phrase = keywords.toString().replace(",", " ");
            message.channel.send(`${phrase} :grimacing:`);
        break;
        case 'gif':
        	let searchKeywords = args.splice(1);
        	if(tag.length > 0) {
        		giphy.searchByKeywords(searchKeywords)
            	.then(function(response) {
            		message.channel.send(
            			{ files: [response.data[0].images.downsized_medium.url] }
            		);
            	})
            	.catch(function(error) {
                	console.error(error);
            	});
        	} else {
        		giphy.getRandom(tag[0])
            	.then(function(response) {
            		message.channel.send(
            			{ files: [response.data.images.downsized_medium.url] }
            		);
            	})
            	.catch(function(error) {
                	console.error(error);
            	});
        	}
        break;
        case 'info':
            let embed = utils.createEmbed(null, chappie.user.username, chappie.user.avatarURL, 
                utils.colors.DARK_GREEN, texts[config.lang].fields.about, null, 
                texts[config.lang].footers.maintainer, chappie.user.avatarURL, utils.icons.INFO)
            .addField(texts[config.lang].titles.help, texts[config.lang].fields.help)
            .addField(texts[config.lang].titles.lang, texts[config.lang].fields.lang);
            message.channel.send(embed);
        break;
        case 'español':
            config.lang = 'spanish';
            message.channel.send(texts[config.lang].fields.language);
        break;
        case 'english':
            config.lang = 'english';
            message.channel.send(texts[config.lang].fields.language);        
        break;
        default: 
        	message.channel.send(texts[config.lang].fields.wrongInput);
        	message.channel.send(texts[config.lang].footers.info);
        break;
    }
    message.channel.stopTyping(true);
}

// discord login
chappie.login(config.discord);