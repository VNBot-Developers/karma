const axios = require('axios').default;
const fs = require('fs');
const { resolve } = require('path');

module.exports = function (url) {
    const path = resolve(__dirname, './temp', 'image.jpg');
    axios({
        url,
        method: 'get',
        responseType: 'buffer'
    }).then(function (response) {
        fs.writeFileSync(path, response)
    });

}