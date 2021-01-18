const axios = require('axios')
const Discord = require('discord.js')
const fs = require('fs')
const generateAuthToken = require('./generateauthToken')

function getuser(message) {
    let jsonString
    let authToken = generateAuthToken.getAuthToken()
    console.log ('getuser')
    console.log(jsonString)
    let arg = message.content.slice(9)
    axios
    .post('https://www.coregames.com/api/search', {
        name: arg
    })
    .then(res => {
        console.log(res.data.profiles[0])
        if (res.data.profiles[0]) {
            let url = ('https://www.coregames.com/users/' + res.data.profiles[0].id)
            let pfpUrl = ('https://www.coregames.com/api/profilepictures/' + res.data.profiles[0].profilePictureId)
            let getgamesurl = ('https://www.coregames.com/api/game/ownedby/' + res.data.profiles[0].id)
            console.log(res.data.profiles[1])
            let totalplays = 0
            let totalgames = 0
            axios
            .post(getgamesurl, {
            })
            .then(resNew => {
                resNew.data.games.forEach(game =>{
                    console.log(game.plays)
                    totalplays += game.plays
                    totalgames++
                })
                let totalplaysstr
                if (totalplays > 1000) {
                    totalplays = totalplays / 1000
                    totalplays = Math.round(totalplays * 10) / 10
                    totalplaysstr = totalplays.toString()
                    totalplaysstr = totalplaysstr + 'k'
                } else {
                    totalplaysstr = totalplays.toString()
                }
                const embed = new Discord.MessageEmbed()
                .setTitle("User Result For " + arg)
                .setDescription(res.data.profiles[0].userName)
                .setThumbnail(pfpUrl)
                .setColor('#FFFFF');
                let bio = ''
                bio += res.data.profiles[0].description
                if (res.data.profiles[0].description == null) {
                    bio = 'This user has not set a bio'
                }
                if (res.data.profiles[0].description == "") {
                    bio = 'This user has not set a bio'
                }
                embed
                .addField('Bio', bio, false)
                .addField(`Total Plays on ${res.data.profiles[0].userName}'s games`, totalplaysstr, true)
                .addField('Level', res.data.profiles[0].questLevel, true)
                .addField('Total Published Games', totalgames)
                .setURL(url)
                ;
                axios
                .post('https://www.coregames.com/api/Template/search_v2?searchTerm=', {
                    'continuationToken': '',
                    'sortOptions': 'MostDownloaded',
                    'reverseSort': false,
                    'categories': null,
                    'ownerID': res.data.profiles[0].id }, {
                        headers: {
                            'AuthToken': authToken
                        }
                    }    
                )

                .then(resNewest => {
                    let totalCCDownloads = 0
                    resNewest.data.items.forEach(CC => {
                        totalCCDownloads += CC.downloadCount
                    })
                    embed.addField('Total CC Downloads', totalCCDownloads, true)
                    message.channel.send(embed)
                })
            })
            .catch(err => {
                console.log(err)
            }) 
        } else {
            let embed = new Discord.MessageEmbed()
            embed.setColor('#FF0000')
            embed.setTitle(`No user with name ${arg} could be found`)
            message.channel.send(embed)
        }       
    })
    .catch(error => {
        console.error(error)
    })
}

module.exports = { getuser };