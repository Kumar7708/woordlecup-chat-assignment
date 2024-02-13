const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const cors = require("cors")
app.use(cors({ origin: 'http://localhost:3000' }));
io.on('connection', (socket) => {
    console.log('Userr connected ', socket.id);

    socket.on('message', (message) => {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
app.use("/socket.io/", (req, res, next) => {
    next()
})

server.listen(5000, () => {
    console.log('Server listening on port 5000');
});