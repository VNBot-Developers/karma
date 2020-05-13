const { resolve } = require("path");
require('dotenv').config({
    path: resolve(__dirname, '../', '.env')
});


const login = require("./login");
const fs = require('fs');
const Handler = require('./events');

const { email, password, pathAppState } = require("./config");
let appState;
try {
    appState = require(pathAppState);
} catch (e) {
    fs.writeFileSync(pathAppState, JSON.stringify({}));
}


login(email, password, appState, function (error, api) {
    if (error) return console.log(error);
    const handler = new Handler(api);
    api.listenMqtt(function (error, event) {
        if (error) return console.log(error);
        switch (event.type) {
            case 'message':
                handler.emit('message', event);
                break;
            case 'event':
                handler.emit('message_event', event);
                break;
            case 'message_reaction':
                handler.emit('message_reaction', event);
                break;
            default:
                return;
                break;
        }
    })

})