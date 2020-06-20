const fs = require('fs');
const EventEmitter = require('events');
const messageHandler = require('./message');
const messageEventHandler = require('./message_event');
const messageReactionHandler = require('./message_reaction');
class Handler extends EventEmitter {
    constructor(api, cacheClient) {
        super();
        this.api = api;
        this.cacheClient = cacheClient;
        this.makeCustom()

        this.on('message', messageHandler);
        this.on('message_event', messageEventHandler);
        this.on('message_reaction', messageReactionHandler);
    }
    makeCustom() {
        this.api.sendAttachment = function name({ body, attachment } = {}, threadID, callback) {
            if (typeof attachment == "undefined")
                return this.api.sendMessage(body, threadID, callback)
            if (typeof attachment == "string")
                return this.api.sendMessage({
                    body,
                    attachment: fs.createReadStream(attachment)
                }, threadID, callback)
            if (typeof attachment == "object" && attachment.length)
                return this.api.sendMessage({
                    body,
                    attachment: attachment.map(path => fs.createReadStream(path))
                }, threadID, callback)
            return callback("Error attachment parram")
        }.bind(this)
    }
    makePromptStepKey(senderId, threadId) {
        return `prompt_${senderID}_${threadID}step`;
    }
}

// const handler = new Handler({ functionA: 1 });

// setInterval(function () {

//     handler.emit('message', new Date().toISOString());
// }, 1000);

module.exports = Handler;