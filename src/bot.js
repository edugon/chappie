var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var chappie = new Discord.Client({
   token: auth.token,
   autorun: true
});

chappie.on('ready', function (evt) {
    logger.info('Logged in as: ' + chappie.username + ' - (' + chappie.id + ')');
    console.log('chappie is ready');
});

chappie.on("guildMemberAdd", function (member) {
  console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
  member.guild.channels.get("putoscasual").send(`Hello World! ${member.user.username} ` +
    `just joined... Welcome! come in and wash the dishes hehe regards`);
});

chappie.on('message', function (user, userID, channelID, message, evt) {
    // chappie needs to know if it will execute a command
    // it will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !heychappie
            case 'heychappie':
                chappie.sendMessage({
                    to: channelID,
                    message: `Heey yooo ${user}! Regards!`
                });
            break;
         }
     }
})