const Discord = require('discord.js'),
	logger = require('winston'),
	chappie = new Discord.Client(),
	config = require('./config.json'),
    utils = require('./utils.js'),
    steamClient = require('./clients/steamClient.js'),
	defaultChannel = 'development'; // dev channel

chappie.on("ready", function() {
	console.log({users: chappie.users.size, channels: chappie.channels.size});
    console.log('chappie is listening');
});

chappie.on("guildCreate", function(guild) {
  	// this event triggers when chappie joins a guild.
  	console.log(`new guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  	let channel = guild.channels.find(ch => ch.name === defaultChannel);
  	channel.startTyping();

    let embed = utils.createEmbed('Hey there!', utils.colors.DARK_GREEN, 
        'Hello World! My name is chappie, nice to meet you all! :sunglasses:',
        utils.gifs.REGARDS, 
        utils.footers.INFO);
    channel.stopTyping(true);
    channel.send(embed);
});

chappie.on("guildDelete", function(guild) {
  	// this event triggers when chappie is removed from a guild.
  	console.log(`i have been removed from: ${guild.name} (id: ${guild.id})`);
  	let channel = guild.channels.find(ch => ch.name === defaultChannel);
  	channel.startTyping();
    let embed = utils.createEmbed('Farewell 😔', utils.colors.DARK_RED, 
        `Hey all, I'm leaving this guild... Nice to meet you people! :sob:`, 
        utils.gifs.WALKING);
    channel.stopTyping(true);
    channel.send(embed);
});

chappie.on("guildMemberAdd", function(member) {
    // this event triggers when new member is added to the guild.
    console.log(`new User "${member.displayName}" has joined "${member.guild.name}"` );
    let channel = member.guild.channels.find(ch => ch.name === defaultChannel);
    if(channel) {
        channel.startTyping();
        let embed = utils.createEmbed('Greetings!', utils.colors.DARK_GREEN, 
            `Hello World! ${member} ` + 
            `just joined... Welcome! come in and wash the dishes hehe regards :joy: :joy:`, 
            utils.gifs.REGARDS, 
            utils.footers.INFO);
        channel.stopTyping(true);
        channel.send(embed);
    }
});

function guessResponse(args, message) {
	let embed = new Discord.RichEmbed();
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
            
        break;
        case 'steam':
            // just showing response, TODO: need to extend
            steamClient.getNews(730, 5, 300).then(function(appnews) {
                console.log(appnews);
            }, function(error) {
                console.error(error);
            });
        break;
        default: 
        	message.channel.startTyping();
        	message.channel.send(`What are you trying to say? :thinking:`);
        	message.channel.send(utils.footers.INFO);
        	message.channel.stopTyping(true);
        break;
    }
}

chappie.on("message", function(message) {
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
                    guessResponse(args, message)
                } else {
                    // default message
                	message.channel.startTyping();
                	let embed = utils.createEmbed('chappie says:', utils.colors.DARK_GREEN, 
                        'Heey yooo ' + message.author + '! Regards! :thumbsup:', 
                        utils.gifs.REGARDS, 
                        utils.footers.INFO);
                    message.channel.stopTyping(true);
                    message.channel.send(embed);
                }
            break;
         }
     }
});

chappie.login(config.token);