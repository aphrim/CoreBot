const axios = require('axios')
const Discord = require('discord.js')
const https = require('https')
const { stringify } = require('querystring')
const generateauthToken = require('./generateauthToken')

function getCC(message) {
    let authToken = generateauthToken.getAuthToken()
    let arg = message.content.slice(7)
    let url = ('https://www.coregames.com/api/Template/search_v2?searchTerm=' + arg)
    axios
    .post(url, {
        'continuationToken': '',
        'sortOptions': 'MostDownloaded',
        'reverseSort': false,
        'categories': null}, {
            headers: {
                'AuthToken': authToken
            }
        }    
    )

    .then(res => {
        let embed = new Discord.MessageEmbed()
        embed.setTitle(`Community Content Search Result For ${arg}`)
        embed.setColor('#fffff')
        embed.addField('Name', res.data.items[0].name, false)
        embed.setThumbnail(res.data.items[0].thumbUrl)
        embed.addField('Created By', res.data.items[0].ownerName, true)
        embed.addField('Likes', res.data.items[0].rating.liked, true)
        embed.addField('Dislikes', res.data.items[0].rating.disliked, true)

        let templateUrl = ('https://www.coregames.com/api/Template/' + res.data.items[0].id)
        https.get(templateUrl, resp => {
            let data = ''
            resp.on('data', (chunk) => {
                data += chunk
            })
            resp.on('end', () => {
                console.log(JSON.parse(data))
                let description = (JSON.parse(data).template.description)

                if (description.length > 200) {
                    description = description.slice(0,200)
                    description += '...'
                }
                embed.setDescription(description)
                embed.addField('Created', (JSON.parse(data).template.created).substring(0,10))
                embed.addField('Updated', (JSON.parse(data).template.updated).substring(0,10))
                embed.addField('Downloads', JSON.parse(data).template.downloadCount)
                message.channel.send(embed)
            })
        })
    })

    .catch(err => {

    })
}

module.exports = {getCC}