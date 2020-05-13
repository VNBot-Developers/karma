const { bot: { prefix, name: botName }, development, admins } = require("../../config");
module.exports = function (event) {
    if (development) console.log("Message Event", event);
    const { api } = this;
    switch (event.logMessageType) {
        case "log:subscribe":
            let addedUserInfo = event.logMessageData.addedParticipants[0];

            if (addedUserInfo.userFbId == api.getCurrentUserID()) {

                api.sendMessage("Bot " + botName + " connected!\nStart listen!", event.threadID);
                api.changeNickname(botName, event.threadID, api.getCurrentUserID(), (err) => {
                    if (err) return console.log(err.stack);
                });
            }

            break;
        case "log:unsubscribe":

            let leftUserID = event.logMessageData.leftParticipantFbId;
            let authorUserID = event.author;

            if (admins.includes(leftUserID)) {

                api.addUserToGroup(leftUserID, event.threadID, (error) => {

                    if (error) return console.log(err.stack);
                });
                if (leftUserID == authorUserID) return api.sendMessage({ body: "Đừng bỏ em mà huhu :(" }, event.threadID);
                api.sendMessage({
                    body: "Đừng làm thế ! Anh ấy là người tốt",
                }, event.threadID);
            }
            break;
        case "log:thread-icon":
            break;
        case "log:user-nickname":
            break;
        case "log:thread-color":
            break;
    }
    // console.log(this);
}