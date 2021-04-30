const axios = require('axios')
const https = require('https');
const Discord = require('discord.js');

const shopurl = 'https://www.coregames.com/api/Store/pages'
const shoppageurl = 'https://www.coregames.com/api/Store/pages/'


function getshop(message) {
    console.log(message.author.username + ' is using get shop ' + message + ' in server ' + message.guild.name)
    let pagenum = message.content.split(' ')[1]
        if (!pagenum) {
            pagenum = 0
        }

        https.get(shopurl, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk
        });
        resp.on('end', () => {
            let index = 0
            let toSend = ''
            const Embed = new Discord.MessageEmbed()
            if (pagenum == 0){
                let index = 1
                JSON.parse(data).pageSummaries.forEach(page => {
                    console.log(page.pageName)
                    Embed.addField('#' + index, page.pageName, true)
                    index = index + 1
                })
                Embed.setTitle('Catalogs in shop')
                Embed.setFooter('Type *getshop x* to get the full details of the xth catalog in the shop')
                Embed.setColor('#FFFFF')
                message.channel.send(Embed)
            } else {
                if (pagenum == 1) {
                    let landingPage = JSON.parse(data).landingPage
                    if (message.content.split(' ')[2]){
                        let pageNumNum = message.content.split(' ')[2]
                        let Embed = new Discord.MessageEmbed()
                        Embed.setColor('#FFFFF')
                        Embed.setTitle(landingPage.bundles[parseInt(pageNumNum) - 1].name)
                        Embed.setImage(landingPage.bundles[parseInt(pageNumNum) - 1].imageUrl)
                        Embed.addField('Price', landingPage.bundles[parseInt(pageNumNum) - 1].priceInVirtualTokens.amount)
                        message.channel.send(Embed)
                    } else {
                        let pageID = JSON.parse(data).pageSummaries[pagenum -  1].pageId
                        if (!message.content.split(' ')[2]) {
                            let pageurl = shoppageurl + pageID
                            https.get(pageurl, (resp) => {
                                let dataNew = '';
                                resp.on('data', (chunk) => {
                                    dataNew += chunk
                                })
                                resp.on('end', () => {
                                    console.log(JSON.parse(dataNew))
                                    let Embed = new Discord.MessageEmbed()
                                    let index = 0
                                    JSON.parse(dataNew).page.bundles.forEach(bundle =>{
                                        console.log(bundle.name)
                                        index += 1
                                        Embed.addField('#' + index, bundle.name, true)
                                    })
                                    Embed.setTitle(JSON.parse(dataNew).page.pageName)
                                    Embed.setColor('#FFFFF')
                                    message.channel.send(Embed)
                                })
                            })
                        } else {
                            
                        }
                    }    
                } else {

                    if (JSON.parse(data).pageSummaries[pagenum]) {
                        let pageID = JSON.parse(data).pageSummaries[pagenum - 1].pageId
                        if (!message.content.split(' ')[2]) {
                            let pageurl = shoppageurl + pageID
                            console.log(pageurl)
                            https.get(pageurl, (resp) => {
                                let dataNew = '';
                                resp.on('data', (chunk) => {
                                    dataNew += chunk
                                })
                                resp.on('end', () => {
                                    console.log(JSON.parse(dataNew))
                                    let Embed = new Discord.MessageEmbed()
                                    let index = 0
                                    JSON.parse(dataNew).page.bundles.forEach(bundle =>{
                                        console.log(bundle.name)
                                        index += 1
                                        Embed.addField('#' + index, bundle.name, true)
                                    })
                                    Embed.setTitle(JSON.parse(dataNew).page.pageName)
                                    Embed.setColor('#FFFFF')
                                    message.channel.send(Embed)
                                })
                            })        
                        } else {
                            let pageID = JSON.parse(data).pageSummaries[pagenum -  1].pageId
                            if (message.content.split(' ')[2]) {
                                let pageurl = shoppageurl + pageID
                                https.get(pageurl, (resp) => {
                                    let dataNew = '';
                                    resp.on('data', (chunk) => {
                                        dataNew += chunk
                                    })
                                    resp.on('end', () => {
                                        let index = 0
                                        let pageNumNum = message.content.split(' ')[2]
                                        let Embed = new Discord.MessageEmbed()
                                        Embed.setColor('#FFFFF')
                                        Embed.setTitle(JSON.parse(dataNew).page.bundles[parseInt(pageNumNum) - 1].name)
                                        Embed.setImage(JSON.parse(dataNew).page.bundles[parseInt(pageNumNum) - 1].imageUrl)
                                        let dollarPrice = ('$'+ ((JSON.parse(dataNew).page.bundles[parseInt(pageNumNum) - 1].price).toString()))
                                        if (JSON.parse(dataNew).page.bundles[parseInt(pageNumNum) - 1].priceInVirtualTokens.amount == 0) {
                                            Embed.addField('Price', dollarPrice)
                                        } else {
                                            Embed.addField('Price', JSON.parse(dataNew).page.bundles[parseInt(pageNumNum) - 1].priceInVirtualTokens.amount)
                                        } 
                                        message.channel.send(Embed)
                                    })
                                })
                            }
                        }
                    }
                }
            }
        })
    })    
}
module.exports = { getshop };