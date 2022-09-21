const {Router} = require('express');
const {socket} = require('./socket-io.js');

const router = Router();

router.post('/ganador', (req, res) => {

    const {sala, nombreGanador, socketId, movimientos} = req.query;

    socket.io.to(sala).emit('ganador', {nombreGanador, socketId, movimientos});

    res.send({status: 200});
});

router.post('/empezar', (req, res) => {

    const {sala} = req.query;
    const {reload, socketId} = req.body;

    socket.io.to(sala).emit('empezar', {socketId, reload, tiempo: 5});

    res.send({status: 200});
});

router.post('/unir-sala', (req, res) => {

    const {nombre, sala, socketId} = req.query;

    socket.io.to(sala).emit('uniendo-jugador', {nombre, socketId});

    res.send({status: 200});
});

router.post('/hello', (req, res) => {

    const {nombre, sala} = req.query;

    socket.io.to(sala).emit('salida-exitosa', {nombre});

    res.send({status: 200});
});

module.exports = router;
