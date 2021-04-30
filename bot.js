const config = require('./config.json')
const token = config.botToken
const Discord = require('discord.js');
const Client = new Discord.Client();
const editJsonFile = require("edit-json-file");

//function imports 
const getshop = require("./Functions/getshop");
const getfeatured = require("./Functions/getfeatured");
const gettop = require("./Functions/gettop");
const getactive = require("./Functions/getactive");
const help = require("./Functions/help");
const getgame = require("./Functions/getgame")
const getuser = require("./Functions/getuser")
const generateauthToken = require("./Functions/generateauthToken");
const getCC = require("./Functions/getCC");
const setchannel = require("./Functions/setbotchannel")
const clearchannel = require("./Functions/clearbotchannel");
const gethighestrated = require("./Functions/gethighestrated")



Client.on('ready', () => {
    generateauthToken.generateAuthToken()
})

Client.on('message', message => {
    let messageCMD = message.content.split(' ')[0].toLowerCase()
    console.log('message sent')
    if (messageCMD == '!setchannel') {
        setchannel.setbotChannel(message)
    }

    if (messageCMD == '!clearchannel') {
        clearchannel.clearbotChannel(message)
    }

    let guildJSON = editJsonFile("./tempStorage/guilds.json")
    if (message.guild) {
        if (guildJSON.get(message.guild.id)) {
            if (guildJSON.get(message.guild.id).commandChannel) {
                if (guildJSON.get(message.guild.id).commandChannel != message.channel.id) {
                    return
                }
            }
        }
    }
    if (messageCMD == '!getfeatured') {
        try{
            getfeatured.getfeatured(message)
        }
        catch{}
    }    

    if (messageCMD == '!gettop') {
        try{
        gettop.gettop(message)
        }
        catch{}
    }

    if (messageCMD == '!getactive') {
        try{
        getactive.getactive(message)
        }
        catch{}
    }

    if (messageCMD == '!gethighestrated') {
        try{
        gethighestrated.gethighestrated(message)
        }
        catch{}
    }

    if (messageCMD == '!getshop') {
        try{
        getshop.getshop(message)
        }
        catch{}
    }

    if (messageCMD == '!help') {
        try{
        help.help(message)
        }
        catch{}
    }

    if (messageCMD == '!getgame') {
        try{
        getgame.getgame(message)
        }
        catch{}
    }   

    if (messageCMD == '!getuser') {
        try{
        getuser.getuser(message)
        }
        catch{}
    } 

    if (messageCMD == '!getcc') {
        try{
        getCC.getCC(message)
        }
        catch{}
    }
})


Client.login(token)