const EventEmitter = require('events');
const messageHandler = require('./message');
const messageEventHandler = require('./message_event');
const messageReactionHandler = require('./message_reaction');
class Handler extends EventEmitter {
    constructor(api, cacheClient) {
        super();
        this.api = api;
        this.cacheClient = cacheClient;
        
        this.on('message', messageHandler);
        this.on('message_event', messageEventHandler);
        this.on('message_reaction', messageReactionHandler);
    }

    makePromptStepKey(senderId, threadId){
        return `prompt_${senderID}_${threadID}step`;
    }
}

// const handler = new Handler({ functionA: 1 });

// setInterval(function () {

//     handler.emit('message', new Date().toISOString());
// }, 1000);

module.exports = Handler;