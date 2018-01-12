const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.port || 8080;

const path = require('path');
const fs = require('fs');
const io = require('socket.io')(server);
const ss = require('socket.io-stream');


app.use(express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

io.on('connection', (socket) => {
  socket.emit('start', { hello : 'world!'});
  socket.on('stream', (data) => {
    console.log(data);
    let stream = ss.createStream();
    let filename = path.join(__dirname, '/testing.m4a');
    ss(socket).emit('audio-stream', stream, { name : filename});
    fs.createReadStream(filename).pipe(stream);
  })
});