const Discord = require('discord.js');

function help (message) {
    let Embed = new Discord.MessageEmbed()
    Embed.setTitle(`Hey ${message.author.username}, here are the commands`)
    Embed.setDescription('{} are optional, () are required.')
    Embed.addField('!getshop', '!getshop {catalog} {itemincatalog}. Examples: {!getshop 1 2}, {!getshop 3}, {!getshop}', false)
    Embed.addField('!getuser', '!getuser (user). Example: {!getuser aphrim}', false)
    Embed.addField('!getgame', '!getgame (game). Example: {!getgame Core Parkour Obby}', false)
    Embed.addField('!getcc', '!getcc (search term). Example: {!getcc NPC AI Kit}', false)
    Embed.addField('!get{type}', '!get{type}, types are Active, Featured, Top, Highest Rated. Example: {!gettop}', false)
    Embed.addField('!setchannel', '!setchannel (channel). Sets the channel to be only place where commands can be used. {Server Owner Only}. Clear with !clearchannel ', false)
    Embed.setColor('#fffff')
    message.author.send(Embed)

    let embed = new Discord.MessageEmbed()
    embed.setTitle(`The list of commands has been sent to ${message.author.username}'s DMs`)
    embed.setColor('#fffff')
    message.channel.send(embed)
}

module.exports = {help};