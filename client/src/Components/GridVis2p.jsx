import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalState";
import socketIoClient from 'socket.io-client';
import CellVis from './CellVis';
import Form from "./Form";

export default function GridVis2p() {
  const { darkMode, setSocket, joinForm, openJoinForm } = useContext(GlobalContext);

  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    const socket = socketIoClient('http://localhost:3005');
    setSocket(socket);

    socket.on('state', (state) => {
      setGameState(state);
    });

    const handleKeyDown = ({ key }) => {
      if (key.slice(0, 5) === 'Arrow') socket.emit('move', key.slice(5));
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      socket.disconnect();
      setSocket(null);
    };
  }, []);

  if (gameState && gameState.ready) {
    return (
      <div className='grid grid2' style={{
        gridTemplateColumns: `repeat(${gameState.maze[0].length}, 1fr)`
      }}>
        {gameState.maze.map((row) => (
          row.map((cell) => <CellVis key={`${cell.row},${cell.column}`} cell={cell} />)
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

