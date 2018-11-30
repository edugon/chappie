const Discord = require("discord.js"),
	logger = require('winston'),
	chappie = new Discord.Client(),
	config = require("./config.json");

chappie.on("ready", function() {
	console.log({users: chappie.users.size, channels: chappie.channels.size});
    console.log('chappie is listening');
});

/*chappie.on("guildCreate", guild => {
  	// This event triggers when the bot joins a guild.
  	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  	chappie.user.setActivity(`Serving ${chappie.guilds.size} servers`);
});

chappie.on("guildDelete", guild => {
  	// this event triggers when the bot is removed from a guild.
  	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  	chappie.user.setActivity(`Serving ${chappie.guilds.size} servers`);
});*/

chappie.on("guildMemberAdd", function(member) {
    console.log(`New User "${member.displayName}" has joined "${member.guild.name}"` );
    let channel = member.guild.channels.find(ch => ch.name === 'putoscasual');
    if(channel) {
        channel.startTyping();
        let embed = new Discord.RichEmbed()
            .setColor('DARK_GREEN')
            .setDescription(`Hello World! ${member} ` +
        	    `just joined... Welcome! come in and wash the dishes hehe regards :joy: :joy:`)
            .setImage('https://media2.giphy.com/media/pjZLhQIEx9dBe/giphy-downsized.gif')
            .setFooter('Type "!chappie info" to know more about me');
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
            embed.setColor('DARK_GREEN')
                .setDescription(`${phrase} :grimacing:`);
            message.channel.stopTyping(true);
            message.channel.send(embed);
        break;
        default: 
        	message.channel.startTyping();
        	embed.setColor('DARK_RED')
        		.setDescription(`What are you trying to say? :thinking:`);
        	message.channel.stopTyping(true);
        	message.channel.send(embed);
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
                	message.channel.startTyping();
                	let embed = new Discord.RichEmbed()
                		.setColor('DARK_GREEN')
                		.setDescription('Heey yooo ' + message.author + '! Regards! :thumbsup:')
                		.setImage('https://media2.giphy.com/media/pjZLhQIEx9dBe/giphy-downsized.gif');
                    message.channel.stopTyping(true);
                    message.channel.send(embed);
                }
            break;
         }
     }
});

chappie.login(config.token);