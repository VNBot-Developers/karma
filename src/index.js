const { resolve } = require("path");
require('dotenv').config({
    path: resolve(__dirname, '../', '.env')
});
const login = require("./login");
const fs = require('fs');
const { email, password, pathAppState, botName } = require("./config");
let appState;

try {
    appState = require(pathAppState);
} catch (e) {
    fs.writeFileSync(pathAppState, JSON.stringify({}));
}

login(email, password, appState, function (error, api) {
    if (error) console.log(error);

})