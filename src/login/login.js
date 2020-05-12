const login = require("facebook-chat-api");
const options = require("./options");
const errorMessageHandler = require("./error");
module.exports = (op) => new Promise(function (resolve, reject) {
    login(op, function (err, api) {
        if (err) {
            const errorMessage = errorMessageHandler(err);
            reject(errorMessage);
        }
        api.setOptions(options);
        resolve(api)

    })
})