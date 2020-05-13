const { resolve } = require("path");
require('dotenv').config({
    path: resolve(__dirname, '../', '.env')
});
const mongoose = require('mongoose');
const login = require("./login");
const fs = require('fs');
const Handler = require('./events');
const redis = require('redis');
const { promisify } = require("util");


const { email, password, pathAppState } = require("./config");
let appState;
try {
    appState = require(pathAppState);
} catch (e) {
    fs.writeFileSync(pathAppState, JSON.stringify({}));
}

mongoose.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

mongoose.connection
    .once('open', function () {
        console.log("Connection database success!")
    })
    .on('error', function (error) {
        console.log(error.stack);
        process.exit(1);
    });

const cacheClient = redis.createClient({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || '6379',
    password: process.env.REDIS_PASSWORD || null,

});

cacheClient.getAsync = promisify(cacheClient.get).bind(cacheClient);
cacheClient.on("error", function (error) {
    console.log(error.stack);
});
login(email, password, appState, function (error, api) {
    if (error) return console.log(error);
    const handler = new Handler(api, cacheClient);
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