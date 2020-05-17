const axios = require('axios').default;
const fs = require('fs');
const { resolve } = require('path');
const path = resolve(__dirname, './temp', 'image.jpg');
axios({
    url: 'https://i.imgur.com/dfxm1KO.jpg',
    method: 'get',
    responseType: 'document',
    responseEncoding: 'utf8',
}).then(function (response) {
    fs.writeFileSync(path, response)
    console.log("ghi thanh cong")
});