const socketIO = require('socket.io');

var socket = {};

const connect = (server) => {
    socket.io = socketIO(server, {
        cors: {
            origin: "https://puzzle-jesuanp.herokuapp.com/",
            methods: ["GET", "POST"]
        }
    });
}

module.exports = {
    connect,
    socket
}
