import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext } from "../Context/GlobalState";
import socketIoClient from 'socket.io-client';
import CellVis2p from './CellVis2p';
import Form from "./Form";

export default function GridVis2p({ notify, buttonToast }) {
  const { darkMode, setSocket, joinForm } = useContext(GlobalContext);

  const [gameState, setGameState] = useState(null);
  const [socketId, setSocketId] = useState(null);

  useEffect(() => {
    const socket = socketIoClient('http://localhost:3005');
    setSocket(socket);

    socket.on('connect', () => {
      setSocketId(socket.id);
    });

    socket.on('state', (state) => {
      setGameState(state);
      console.log('got state update');
    });

    socket.on('roomFull', (roomName) => {
      notify(`Room ${roomName.toUpperCase()} is already full!`, 'error');
    })

    socket.on('invalidRoom', (roomName) => {
      notify(`${roomName.toUpperCase().slice(0,6)}${roomName.length > 6 ? '. . .' : ''} is an invalid room code.`, 'error');
    })

    socket.on('joinedRoom', (roomName) => {
      notify(`Successfully joined room ${roomName.toUpperCase()}`, 'success');
    })

    socket.on('playerDisconnected', (player1) => {
      if (player1) notify('Player 1 has disconnected from the room. . .', 'error');
      else notify(`Player 2 has disconnected from the room. . .`, 'error')
    })

    socket.on('winner', (win) => {
      if (win) notify('You won!', 'default');
      else notify('You lost...', 'default');
    })

    socket.on('newGame', () => {
      buttonToast();
    });

    const handleKeyDown = ({ key }) => {
      if (key.slice(0, 5) === 'Arrow') socket.emit('move', key.slice(5));
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      socket.disconnect();
      setSocketId(null);
      setSocket(null);
    };
  }, []);

  if (gameState && gameState.ready) {
    return (
      <div className='grid grid2' style={{
        gridTemplateColumns: `repeat(${gameState.maze[0].length}, 1fr)`
      }}>
        {gameState.maze.map((row) => (
          row.map((cell) => <CellVis2p
            key={`${cell.row},${cell.column}`}
            cell={cell}
            pathA={gameState.p1Path}
            pathB={gameState.p2Path}
            grid={gameState.maze}
            player1={socketId === gameState.player1}
          />)
        ))}
      </div>
    );
  }

  if (joinForm) {
    return (
      <div className='grid instructions' style={{
        border: `4px solid ${darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)'}`,
      }}>
        <div style={{ fontSize: 'x-large' }}>
          Enter your code here:
          <br /><br />
          <Form />
        </div>
      </div>
    )
  }

  if (!gameState) {
    return (
      <div className='grid instructions' style={{
        border: `4px solid ${darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)'}`
      }}>
        <p style={{ fontSize: 'x-large' }}>
          ↓ Get started with the buttons below ↓
        </p>
      </div>
    )
  }

  if (!gameState.ready) {
    return (
      <div className='grid instructions' style={{
        border: `4px solid ${darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)'}`,
      }}>
        <p style={{ fontSize: 'x-large' }}>Room code:&nbsp;
          <strong><code>{gameState.roomName.toUpperCase()}</code></strong>
          <br /><br />
          Waiting for Player 2 to join!
        </p>
      </div>
    )
  }
};

