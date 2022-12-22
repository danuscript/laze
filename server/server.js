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
    if (room) {
      io.to(room).emit('playerDisconnected', socket.id === games.rooms[room].player1);
      games.rooms[room].players -= 1;
      games.rooms[room].ready = false;
    }
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
      roomName,
      maze: miniMaze,
      players: 1,
      ready: false,
      p1Path: player.path,
      p2Path: null,
      player1: socket.id,
      won: false,
    };

    io.to(roomName).emit('state', games.rooms[roomName]);
  });

  socket.on('joinRoom', (roomName) => {
    if (!(roomName in games.rooms)) {
      return io.to(socket.id).emit('invalidRoom', roomName);
    }
    if (games.rooms[roomName].players >= 2) {
      return io.to(socket.id).emit('roomFull', roomName);
    }
    console.log(`Joining room: ${roomName}`);
    socket.join(roomName);
    io.to(roomName).emit('joinedRoom', roomName);
    games.rooms[roomName].players += 1;
    games.rooms[roomName].player2 = socket.id;
    games.rooms[roomName].ready = true;

    const player = games.players[socket.id];
    const { maze } = games.rooms[roomName];
    player.room = roomName;
    player.path = { length: 0 };
    player.position = [0, maze[0].length - 1];
    player.path[`${player.position[0]},${player.position[1]}`] = {
      cell: maze.at(0).at(-1), idx: 0,
    };

    games.rooms[roomName].p2Path = player.path;
    io.to(roomName).emit('state', games.rooms[roomName]);
  });

  socket.on('newGame', () => {
    const roomName = games.players[socket.id].room;

    const maze = new DistanceGrid(15, 15);
    Kruskals.on(maze);
    maze.addWalls();
    const miniMaze = maze.minify();

    let { player1, player2 } = games.rooms[roomName];
    player1 = games.players[player1];
    player2 = games.players[player2];
    player1.path = { length: 0 };
    player2.path = { length: 0 };
    player1.path['0,0'] = {
      cell: miniMaze.at(0).at(0), idx: 0,
    };
    player2.path[`0,${miniMaze[0].length - 1}`] = {
      cell: miniMaze.at(0).at(-1), idx: 0,
    }
    player1.position = [0, 0];
    player2.position = [0, miniMaze[0].length - 1];

    games.rooms[roomName] = {
      ...games.rooms[roomName],
      maze: miniMaze,
      p1Path: player1.path,
      p2Path: player2.path,
      won: false,
    };
    io.to(roomName).emit('state', games.rooms[roomName]);
  });

  socket.on('move', (dir) => {
    const player = games.players[socket.id];
    if (!player.room || games.rooms[player.room].won || !games.rooms[player.room].ready) return;
    const { maze } = games.rooms[player.room];
    move(maze, dir, player.position, player.path);
    const [row, col] = player.position;
    const { player1, player2 } = games.rooms[player.room];
    if (socket.id === player1 && row === maze.length - 1 && col === maze[0].length - 1) {
      io.to(player1).emit('winner', true);
      io.to(player2).emit('winner', false);
      games.rooms[player.room].won = true;
      io.to(player1).emit('newGame');
    }
    if (socket.id === player2 && row === maze.length - 1 && col === 0) {
      io.to(player1).emit('winner', false);
      io.to(player2).emit('winner', true);
      games.rooms[player.room].won = true;
      io.to(player1).emit('newGame');
    }
    io.to(player.room).emit('state', games.rooms[player.room]);
  });
});
