const { bot: { prefix, name: botName }, development } = require("../../config");
module.exports = function (event) {
    if (development) console.log("Message", event);
    const { body, senderID, threadID } = event;
    const { api } = this;
    if (body == `${prefix}ping`) {
        api.sendMessage(`${botName}: Pong!`, senderID);
    }
    // console.log(this);
}