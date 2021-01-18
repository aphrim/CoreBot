const axios = require('axios')
const Discord = require('discord.js');
const https = require('https');

const topurl = 'https://www.coregames.com/api/game/top_games';


function gettop(message) {
    let pagenum = message.content.split(' ')[1]
    if (!pagenum) {
        pagenum = 1
    }
    axios

    .post(topurl, {
    })

    .then(res => {
        let index = 0
        let Embed = new Discord.MessageEmbed()
        res.data.games.forEach(game => {
            index += 1
            if (index < (pagenum * 5) + 1) {
                if (index > (pagenum - 1) * 5) {
                    Embed.addField('#' + index, game.name + ', ' + game.plays + ' plays', false)
                }
            }    
        })
        Embed.setTitle(`Page ${pagenum} of Top Games`)
        Embed.setFooter('Do !gettop x to get the xth page of top games. Only up to 10 pages')
        Embed.setColor('#FFFFF')
        message.channel.send(Embed)
        
    })
    .catch(error => {
        console.error(error)
    })
}

module.exports = { gettop };