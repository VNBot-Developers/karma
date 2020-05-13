const login = require("facebook-chat-api");
const options = require("./options");
const errorMessageHandler = require("./error");
const readline = require("readline");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = (op) => new Promise(function (resolve, reject) {
    login(op, function (err, api) {
        if (err) {
            if (err.error === 'login-approval') {
                console.log('Enter code > ');
                rl.on('line', (line) => {
                    err.continue(line);
                    rl.close();
                });
            }
            const errorMessage = errorMessageHandler(err);
            reject(errorMessage);
        }
        api.setOptions(options);
        resolve(api)

    })
})