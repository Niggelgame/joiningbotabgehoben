const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json');

client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    console.log('Connected as ' + client.user.tag);
})

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    
});

client.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.find(ch => ch.name === 'willkommen');
    if(!channel) return;

    channel.send(`Welcome to the server, ${member}`);

    let myRole = member.guild.roles.find(role => role.name === "Hobener");

    if(myRole == null) {
        console.log(`The role "Hobener" is not available`);
        return;
    }
    member.addRole(myRole).catch(console.error);
    console.log(`User ${member.user.tag} joined the server and now has the "${myRole.name}" permission`);
    
})

client.on('debug', console.log);

client.login(process.env.BOT_TOKEN);
