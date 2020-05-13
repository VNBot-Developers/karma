const { resolve } = require('path');
module.exports = {
    pathAppState: resolve(__dirname, '../', 'appState.json'),
    development: process.env.NODE_ENV !== 'production',
    email: process.env.FACEBOOK_EMAIL || '',
    password: process.env.FACEBOOK_PASSWORD || '',
    bot: {
        prefix: process.env.BOT_PREFIX || '',
        name: process.env.BOT_NAME || 'Karma',
    },
    admins: [100009859624773],
}