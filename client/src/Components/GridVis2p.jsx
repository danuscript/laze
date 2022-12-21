import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalState";
import socketIoClient from 'socket.io-client';
import CellVis from './CellVis';

export default function GridVis2p() {
  const { darkMode } = useContext(GlobalContext);

  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    const socket = socketIoClient('http://localhost:3005');

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
    };
  }, []);

  if (!gameState) {
    return (
      <div className='grid' style={{
        border: `4px solid ${darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)'}`
      }}>
      </div>
    )
  }

  return (
    <div className='grid grid2' style={{
      gridTemplateColumns: `repeat(${gameState.mazes.maze1[0].length}, 1fr)`
    }}>
      {gameState.mazes.maze1.map((row) => (
        row.map((cell) => <CellVis key={`${cell.row},${cell.column}`} cell={cell} />)
      ))}
    </div>
  )
}
