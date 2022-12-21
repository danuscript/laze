const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const DistanceGrid = require('./Classes/DistanceGrid');
const Kruskals = require('./Classes/Kruskals');

const app = express();

const server = http.createServer(app);

const maze = new DistanceGrid(15, 15);
Kruskals.on(maze);
maze.addWalls();

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const port = process.env.PORT || 3005;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const gameState = {
  mazes: { maze1: maze.minify() },
  players: {},
};

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  gameState.players[socket.id] = new Map();
  console.log('Players: ', Object.keys(gameState.players).length);

  io.emit('state', gameState);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);

    delete gameState.players[socket.id];

    io.emit('state', gameState);
  });
});
