const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();

// Allow CORS
//by adding cors we can make elimiate cors error
app.use(cors({
  origin: process.env.FRONTEND_URL, // Use the FRONTEND_URL from .env
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL, // Use FRONTEND_URL for CORS configuration
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


