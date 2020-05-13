const { resolve } = require('path');
module.exports = {
    pathAppState: resolve(__dirname, '../', 'appState.json'),
    development: process.env.NODE_ENV === 'development',
    email: process.env.FACEBOOK_EMAIL || '',
    password: process.env.FACEBOOK_PASSWORD || '',
    prefix: process.env.BOT_PREFIX || '',
    botName: process.env.BOT_NAME || 'Annie',
}