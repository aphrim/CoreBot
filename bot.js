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
        getfeatured.getfeatured(message)
    }    

    if (messageCMD == '!gettop') {
        gettop.gettop(message)
    }

    if (messageCMD == '!getactive') {
        getactive.getactive(message)
    }

    if (messageCMD == '!gethighestrated') {
        gethighestrated.gethighestrated(message)
    }

    if (messageCMD == '!getshop') {
        getshop.getshop(message)
    }

    if (messageCMD == '!help') {
        help.help(message)
    }

    if (messageCMD == '!getgame') {
        getgame.getgame(message)
    }   

    if (messageCMD == '!getuser') {
       getuser.getuser(message)
    } 

    if (messageCMD == '!getcc') {
        getCC.getCC(message)
    }
})


Client.login(token)