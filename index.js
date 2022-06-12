require('dotenv').config();
const server = require('./app.js');
const {connect, socket} = require('./socket-io.js');

connect(server);

socket.io.on('connection', socket => {

    socket.on('unir-sala', data => {

        socket.join(data.codigo.toString());
    });

    socket.on('salir-sala', data => {

        socket.leave(data.codigo.toString());
    })
});

let port = process.env.PORT;

server.listen(port, () => {
    console.log('Server corriendo en el puerto ' + port);
});
