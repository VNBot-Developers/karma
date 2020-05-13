module.exports = function (handler) {
    handler.on('message', (data) => {
        console.log("Message", data);
        console.log(handler);
    });
}