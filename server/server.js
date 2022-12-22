const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const DistanceGrid = require('./Classes/DistanceGrid');
const Kruskals = require('./Classes/Kruskals');
const move = require('./Classes/Move');

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

  games.players[socket.id] = { room: null, path: { length: 0 } };
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

    const miniMaze = maze.minify();

    const player = games.players[socket.id];
    player.room = roomName;
    player.path['0,0'] = { cell: miniMaze[0][0], idx: 0 };
    player.path.length += 1;
    player.position = [0, 0];

    games.rooms[roomName] = {
      roomName, maze: miniMaze, ready: false, p1Path: player.path, p2Path: null, player1: socket.id,
    };

    io.to(roomName).emit('state', games.rooms[roomName]);
  });

  socket.on('joinRoom', (roomName) => {
    console.log(`Joining room: ${roomName}`);
    socket.join(roomName);
    games.rooms[roomName].ready = true;

    const player = games.players[socket.id];
    const { maze } = games.rooms[roomName];
    player.room = roomName;
    player.path = { length: 0 };
    player.position = [0, maze[0].length - 1];
    player.path[`${player.position[0]},${player.position[1]}`] = {
      cell: maze.at(-1).at(-1), idx: 0,
    };

    games.rooms[roomName].p2Path = player.path;

    io.to(roomName).emit('state', games.rooms[roomName]);
  });

  socket.on('move', (dir) => {
    const player = games.players[socket.id];
    const { maze } = games.rooms[player.room];
    move(maze, dir, player.position, player.path);
    io.emit('state', games.rooms[player.room]);
  });
});
