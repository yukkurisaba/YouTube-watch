const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_VOICE_STATES] });
const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);
const prefix = process.env.prefix

client.on('ready', ()=> {
  console.log("準備ok!")
  client.user.setActivity('YouTube',{type: ('PLAYING')})
  client.user.setPresence({status:'Online'})
})

client.on('messageCreate', async message => {
     if(!message.content.startsWith(prefix)|| message.author.bot) return 
        const arg = message.content.slice(prefix.length).split(/ +/)
        const command= arg.shift().toLowerCase()
        if (command === 'start'){
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
    return message.channel.send(`${invite.code}`);
             });
        }
        if(!message.member.voice.channel)  {
     return message.channel.send("VCに接続してください")
        }
     }
});

client.login(process.env.TOKEN);
