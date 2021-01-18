const editJsonFile = require("edit-json-file");
const Discord  = require('discord.js');
let file = editJsonFile(`./tempStorage/guilds.json`);

function clearbotChannel(message) {
    const args = message.content.trim().split(/ +/g);
    if (message.author.id !== message.guild.ownerID) {
        let embed = new Discord.MessageEmbed()
        embed.setColor('#FF0000')
        embed.setTitle('You must the server owner to send this command')
        message.channel.send(embed)
        return
    }

    let obj = {
    }

    console.log(obj)
    file.set(message.guild.id, obj)
    file.save();

    let embed = new Discord.MessageEmbed()
    embed.setColor('#00FF00')
    embed.setTitle('Successfully update channel')
    message.channel.send(embed)
}

module.exports = {clearbotChannel}