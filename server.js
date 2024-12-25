const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

// Allow CORS
app.use(cors({
  origin: 'http://localhost:51162/', // Replace with your frontend URL
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:51162/', // Replace with your frontend URL
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('send-message', (msg) => {
    io.emit('new-message', msg); // Broadcast message to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = 3003;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
