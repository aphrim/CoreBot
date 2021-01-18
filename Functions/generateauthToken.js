const axios = require('axios')
const config = require("../config.json")
let authToken = ''

function generateAuthToken () {
    axios
    .post ('https://www.coregames.com/api/Account/login', {
        "email": config.coreEmail,
        "password": config.corePassword,
        'savePassword': true
    })
    .then(res => {
        console.log(res.data.authToken)
        authToken = res.data.authToken
    })
}

function getAuthToken() {
    return authToken
}

module.exports = {generateAuthToken, getAuthToken}