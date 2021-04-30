const Discord = require('discord.js')
const axios = require('axios')
const https = require('https')

function getgame(message) {
    let arg = message.content.slice(9)
    console.log(message.author.username + ' is using get game ' + arg + ' in server ' + message.guild.name)
    axios
    .post('https://www.coregames.com/api/search', {
        name: arg
    })
    .then(res => {
        if (res.data.games[0]) {
            let url = ('https://ww.coreagmes.com/games') + res.data.games[0].selfUrl 
            let geturl = ('https://www.coregames.com/api/game/' + res.data.games[0].selfUrl)
            const embed = new Discord.MessageEmbed()
            .setTitle("Game Result For " + arg)
            .setDescription(res.data.games[0].name)
            .setThumbnail(res.data.games[0].thumbUrl)
            .setAuthor('Made By ' + res.data.games[0].ownerUserName)
            .setColor('#FFFFF')
            let des
            https.get(geturl, (resp) => {
                let data = ''

                resp.on('data', (Datachunk) => {
                    data += Datachunk
                })

                resp.on('end', () => {
                    des = (JSON.parse(data).game.description)
                    if (des.length > 200) {
                        des = des.substring(0,200) + '...'
                    }
                    embed
                    .addField('Description', des, false)
                    .addField('Plays', res.data.games[0].plays, true)
                    .addField('Likes', res.data.games[0].rating.liked, true)
                    .addField('Dislikes', res.data.games[0].rating.disliked, true)
                    .setURL(url)
                    ;
                    message.channel.send(embed)
                });
            })
        } else {
            let embed = new Discord.MessageEmbed()
            embed.setColor('#FF0000')
            embed.setTitle(`No game with name ${arg} could be found`)
            message.channel.send(embed)
        }

    })
    .catch(error => {
        console.error(error)
        message.channel.send('hmm there was an error')
    })
}

module.exports = { getgame };