const {Router} = require('express');
const {socket} = require('./socket-io.js');

const router = Router();

router.post('/ganador', (req, res) => {

    const {sala} = req.query;

    socket.io.to(sala).emit('ganador');

    res.send({status: true});
});

router.post('/empezar', (req, res) => {

    const {sala} = req.query;
    const {reload, socketId} = req.body;

    socket.io.to(sala).emit('empezar', {socketId, reload, tiempo: 5});

    res.send({status: true});
});

module.exports = router;
