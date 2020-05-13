const { bot: { prefix, name: botName }, development } = require("../../config");
module.exports = function (event) {
    if (development) console.log("Message", event);
    const { body, senderID, threadID } = event;
    const contentMessage = body.trim();
    const { api, cacheClient } = this;
    cacheClient.get(`prompt_${senderID}_${threadID}_step`, function name(error, step) {
        if (error) return;
        console.log(`prompt_${senderID}_${threadID}_step`, step)
        switch (step) {
            case 'email_prompt_1':

                api.sendMessage(`Email của bạn: ${body}`, threadID);
                cacheClient.set(`prompt_${senderID}_${threadID}_step`, '')
                break;

            default:
                break;
        }
    })

    if (contentMessage == `${prefix}ping`) {
        api.sendMessage(`${botName}: Pong!`, threadID);
        return;
    }
    if (contentMessage == `${prefix}email`) {
        api.sendMessage(`Nhập email: `, threadID);
        cacheClient.set(`prompt_${senderID}_${threadID}_step`, 'email_prompt_1')
    }
    if (contentMessage == `${prefix}linh`) {
        api.createPoll("Linh có xinh không? ", threadID, {
            "Không": false,
            "Có": true
        }, (err) => {
            if (err) return console.log(err.stack)
        });
        return;
    }
    // console.log(this);
}