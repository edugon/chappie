const Discord = require('discord.js'),
	logger = require('winston'),
	chappie = new Discord.Client(),
	config = require('./config.json'),
    texts = require('./texts.json'),
    consts = require('./utils/consts.js'),
	messages = require('./utils/messages.js'),
	commands = require('./commands.js'),
	defaultChannel = 'development'; // dev channel

// this event triggers when chappie is ready
chappie.on('ready', function() {
	console.log({users: chappie.users.size, channels: chappie.channels.size});
	console.log('chappie is listening');
});

// this event triggers when chappie joins a guild
chappie.on('guildCreate', function(guild) {
    console.log('new guild joined');
    console.log({guildName: guild.name, guildID: guild.id, members: guild.memberCount});
  	let channel = guild.channels.find(ch => ch.name === defaultChannel);
  	channel.startTyping();
    let embed = messages.createEmbed(null, chappie.user.username, chappie.user.avatarURL,
        consts.colors.DARK_GREEN, texts[config.lang].fields.helloWorld, consts.gifs.REGARDS, 
        texts[config.lang].footers.info, null, consts.icons.INFO);
    channel.stopTyping(true);
    channel.send(embed);
});

// this event triggers when chappie is removed from a guild
chappie.on('guildDelete', function(guild) {
  	console.log('removed from guild');
    console.log({guildName: guild.name, guildID: guild.id});
  	let channel = guild.channels.find(ch => ch.name === defaultChannel);
  	channel.startTyping();
    let embed = messages.createEmbed(null, chappie.user.username, chappie.user.avatarURL, 
        consts.colors.DARK_RED, texts[config.lang].fields.farewell, consts.gifs.WALKING);
    channel.stopTyping(true);
    channel.send(embed);
});

// this event triggers when new member is added to the guild
chappie.on('guildMemberAdd', function(member) {
    console.log('new user');
    console.log({member: member.displayName, guild: member.guild.name});
    let channel = member.guild.channels.find(ch => ch.name === defaultChannel);
    if(channel) {
        channel.startTyping();
        let embed = messages.createEmbed(null, chappie.user.username, chappie.user.avatarURL, 
            consts.colors.DARK_GREEN, `Hello World! ${member} ` + texts[config.lang].fields.memberAdd, 
            consts.gifs.REGARDS, texts[config.lang].footers.info, null, consts.icons.INFO);
        channel.stopTyping(true);
        channel.send(embed);
    }
});

// this event triggers when member sends a message
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
                    commands.guessCommand(args, message, chappie);
                } else {
                    // default message
                	message.channel.startTyping();
                	let embed = messages.createEmbed(null, chappie.user.username, 
                        chappie.user.avatarURL, consts.colors.DARK_GREEN, 
                        'Heey yooo ' + message.author + '! ' + texts[config.lang].titles.regards, 
                        consts.gifs.REGARDS, texts[config.lang].footers.info, null, consts.icons.INFO);
                    message.channel.stopTyping(true);
                    message.channel.send(embed);
                }
            break;
         }
     }
});

// discord login
chappie.login(config.tokens.discord);