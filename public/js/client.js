var socket = io('http://localhost:' + window.location.port);
var audio = document.getElementById('audio');


socket.on('start', function (data) {

  socket.emit('stream', { Any: 'random data' });
    ss(socket).on('audio-stream', function(stream, data) {
        parts = [];
        stream.on('data', (chunk) => {
          parts.push(chunk);
        });
        stream.on('end', function () {
          audio.src = URL.createObjectURL(new Blob(parts));
          audio.play();
        });
    });
});