const https = require('https');
const Discord = require('discord.js');

const featuredurl = 'https://www.coregames.com/api/game/featured';

function getfeatured(message) {
    console.log(message.author.username + ' is using get Featured in server ' + message.guild.name)
    let pagenum = message.content.split(' ')[1]
        if (!pagenum) {
            pagenum = 1
        }
        console.log ('pagenum is ' + pagenum)
        https.get(featuredurl, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk
        });
        resp.on('end', () => {
            console.log(JSON.parse(data).games[0].name);
            let index = 0
            let toSend = ''
            JSON.parse(data).games.forEach(game => {
                index += 1
                if (index < (pagenum - 1) * 5) {
                    console.log('too low')
                } else if (index > pagenum* 5) {
                    console.log('too high')
                } else {
                    toSend += '\n'
                    toSend += ('\n' + '#' + index + ' ' + game.name + ' By:' + game.ownerUserName)
                    toSend += ('\n' + 'Rating: ' + game.rating.liked + ' Likes, ' + game.rating.disliked + ' dislikes')
                }
            })
            const embed = new Discord.MessageEmbed()
                .setTitle("Core's Featured Games")
                .setDescription(toSend)
                .setColor('#FFFFF');

            message.channel.send(embed)
        })
    })
}

module.exports = { getfeatured };