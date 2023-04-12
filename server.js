const express = require('express');
const app = express();

// Serve static files from the "public" directory
app.use(express.static('public'));

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

server.listen(4000, () => {
  console.log('Server running on port 4000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat-message', (data) => {
    io.emit('chat-message', data);
  });
});
