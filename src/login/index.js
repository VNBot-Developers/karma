const login = require("./login");
const { pathAppState } = require("../config");
const fs = require('fs');
module.exports = async function (email, password, appState, callback) {
    if (typeof callback !== "function") return console.error("You must pass a function");
    let api;
    try {
        api = await login({ appState }).catch(() => login({ email, password }));
        fs.writeFileSync(pathAppState, api.getAppState())
        callback(undefined, api);
    }
    catch (e) {
        callback(e);
    }
}