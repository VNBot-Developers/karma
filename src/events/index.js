const EventEmitter = require('events');
const messageHandler = require('./message');
const messageEventHandler = require('./message_event');
const messageReactionHandler = require('./message_reaction');
class Handler extends EventEmitter {
    constructor(api) {
        super();
        this.api = api;
        this.on('message', messageHandler);
        this.on('message_event', messageEventHandler);
        this.on('message_reaction', messageReactionHandler);
    }
}

// const handler = new Handler({ functionA: 1 });

// setInterval(function () {

//     handler.emit('message', new Date().toISOString());
// }, 1000);

module.exports = Handler;