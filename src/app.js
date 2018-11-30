const Discord = require('discord.js'),
	logger = require('winston'),
	chappie = new Discord.Client(),
	config = require('./config.json'),
	defaultChannel = 'development'; // my dev channel

chappie.on("ready", function() {
	console.log({users: chappie.users.size, channels: chappie.channels.size});
    console.log('chappie is listening');
});

chappie.on("guildCreate", function(guild) {
  	// this event triggers when chappie joins a guild.
  	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  	let channel = guild.channels.find(ch => ch.name === defaultChannel);
  	channel.startTyping();
    let embed = new Discord.RichEmbed()
        .setColor('DARK_GREEN')
        .setTitle('Hey there!')
        .setDescription(`Hello World! My name is chappie, nice to meet you all! :sunglasses:`)
        .setImage('https://media2.giphy.com/media/pjZLhQIEx9dBe/giphy.gif')
        .setFooter(':thought_balloon: Type "!chappie info" to know more about me');
    channel.stopTyping(true);
    channel.send(embed);
});

chappie.on("guildDelete", function(guild) {
  	// this event triggers when chappie is removed from a guild.
  	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  	let channel = guild.channels.find(ch => ch.name === defaultChannel);
  	channel.startTyping();
    let embed = new Discord.RichEmbed()
        .setColor('DARK_RED')
        .setTitle('Farewell :(')
        .setDescription(`Hey all, I'm leaving this guild... Nice to meet you people! :sob:`)
        .setImage('https://media.giphy.com/media/KWjRQ4Zttlzb2/giphy.gif')
        .setFooter(':thought_balloon: Add me again whenever you want');
    channel.stopTyping(true);
    channel.send(embed);
});

chappie.on("guildMemberAdd", function(member) {
    // this event triggers when new member is added to the guild.
    console.log(`New User "${member.displayName}" has joined "${member.guild.name}"` );
    let channel = member.guild.channels.find(ch => ch.name === defaultChannel);
    if(channel) {
        channel.startTyping();
        let embed = new Discord.RichEmbed()
            .setColor('DARK_GREEN')
            .setTitle('Greetings!')
            .setDescription(`Hello World! ${member} ` +
        	    `just joined... Welcome! come in and wash the dishes hehe regards :joy: :joy:`)
            .setImage('https://media2.giphy.com/media/pjZLhQIEx9dBe/giphy.gif')
            .setFooter(':thought_balloon: Type "!chappie info" to know more about me');
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
        default: 
        	message.channel.startTyping();
        	message.channel.send(`What are you trying to say? :thinking:`);
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
                	let embed = new Discord.RichEmbed()
                		.setColor('DARK_GREEN')
                		.setTitle('Hey there!')
                		.setDescription('Heey yooo ' + message.author + '! Regards! :thumbsup:')
                		.setImage('https://media2.giphy.com/media/pjZLhQIEx9dBe/giphy.gif')
                		.setFooter(':thought_balloon: Type "!chappie info" to know more about me');
                    message.channel.stopTyping(true);
                    message.channel.send(embed);
                }
            break;
         }
     }
});

chappie.login(config.token);