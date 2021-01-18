const https = require('https');
const Discord = require('discord.js');
const axios = require('axios');

const activeurl = 'https://www.coregames.com/api/game/most_active';

function getactive(message) {
    let pagenum = message.content.split(' ')[1]
    if (!pagenum) {
        pagenum = 1
    }
    axios

    .post(activeurl, {
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
        Embed.setTitle(`Page ${pagenum} of Active Games`)
        Embed.setFooter('Do !getactive x to get the xth page of active games.')
        Embed.setColor('#FFFFF')
        message.channel.send(Embed)
        
    })
    .catch(error => {
        console.error(error)
    })

}

module.exports = { getactive };