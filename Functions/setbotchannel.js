const editJsonFile = require("edit-json-file");
const Discord  = require('discord.js');
let file = editJsonFile(`./tempStorage/guilds.json`);

function setbotChannel(message) {
    const args = message.content.trim().split(/ +/g);
    if (message.author.id !== message.guild.ownerID) {
        let embed = new Discord.MessageEmbed()
        embed.setColor('#FF0000')
        embed.setTitle('You must the server owner to send this command')
        message.channel.send(embed)
        return
    }
    
    if (!message.mentions.channels.first()) {
        let embed = new Discord.MessageEmbed()
        embed.setColor('#FF0000')
        embed.setTitle('Please mention a valid channel in this server')
        message.channel.send(embed)
        return
    }
    let obj = {
        "commandChannel": message.mentions.channels.first().id
    }

    file.set(message.guild.id, obj)
    file.save();

    let embed = new Discord.MessageEmbed()
    embed.setColor('#00FF00')
    embed.setTitle('Successfully update channel')
    message.channel.send(embed)
}

module.exports = {setbotChannel}