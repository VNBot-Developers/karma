const md5 = require("md5");
const fileType = require('file-type');
const axios = require('axios').default;
const fs = require('fs');
const { resolve } = require('path');
const tempPath = resolve(__dirname, '../temp');
if (!fs.existsSync(tempPath)) {
    fs.mkdirSync(tempPath);
}
module.exports = async function (url) {
    const response = await axios({
        url,
        method: 'get',
        responseType: 'arraybuffer'
    })
    const buffer = Buffer.from(response.data, 'base64');
    let { ext, mime } = await fileType.fromBuffer(buffer);
    if (!['audio', 'image', 'video'].includes(mime.split('/')[0])) return Promise.reject('Only support audio, image, video file');    
    const path = resolve(tempPath, `${md5(url).slice(0, 12)}.${ext}`);
    fs.writeFileSync(path, buffer)
    return path;
}