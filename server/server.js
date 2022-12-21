const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const DistanceGrid = require('./Classes/DistanceGrid');
const Kruskals = require('./Classes/Kruskals');

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const port = process.env.PORT || 3005;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const games = {
  rooms: {},
  players: {},
};

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  games.players[socket.id] = { room: null, path: new Map() };
  console.log('Players: ', Object.keys(games.players).length);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    const { room } = games.players[socket.id];
    delete games.players[socket.id];
    console.log('Players: ', Object.keys(games.players).length);
    if (room) io.to(room).emit('state', games.rooms[room]);
  });

  socket.on('createRoom', (roomName) => {
    console.log(`Creating new room: ${roomName}`);
    socket.join(roomName);

    const maze = new DistanceGrid(15, 15);
    Kruskals.on(maze);
    maze.addWalls();

    games.rooms[roomName] = { roomName, maze: maze.minify(), ready: false };
    io.to(roomName).emit('state', games.rooms[roomName]);
  });

  socket.on('joinRoom', (roomName) => {
    console.log(`Joining room: ${roomName}`);
    socket.join(roomName);
    console.log(games);
    games.rooms[roomName].ready = true;
    io.to(roomName).emit('state', games.rooms[roomName]);
  });

  socket.on('move', (dir) => {
    const directions = {
      Up: 'north', Down: 'south', Left: 'west', Right: 'east',
    };
    const direction = directions[dir];
    console.log(direction);
    io.emit('state', games);
  });
});
