import './App.css';
import GridVis from './Components/GridVis';
import Button from './Components/Button';
import { GlobalContext, GlobalProvider } from './Context/GlobalState';
import React, { useContext, useEffect } from 'react';
import Toggle from './Components/Toggle';

const App = () => {
  return (
    <GlobalProvider>
      <Main />
    </GlobalProvider>
  )
}

const directions = { Up: 'north', Down: 'south', Left: 'west', Right: 'east' };

const Main = () => {
  const { grid, generateMaze, move, position, darkMode, solve, toggleDarkMode } = useContext(GlobalContext);

  useEffect(() => {
    const handleKey = ({ key }) => {
      if (key.includes('Arrow')) {
        const direction = key.slice(5);
        move(directions[direction]);
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  });

  useEffect(() => {
    if (position === grid.at(grid.rows - 1, grid.columns - 1)) {
      solve(true);
    }
  }, [position]);

  const onChange = (mode) => toggleDarkMode(mode);

  return (
    <div className='App' style={{color: darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)'}}>
      <div className='header'>
        <div className='twoPlayerButton'>1p / 2p</div>
        <h1 className='title'>LAZE</h1>
        <Toggle onChange={onChange} />
      </div>
      <GridVis grid={grid} />
      <div className='buttonTray'>
        <Button label='new maze' onClick={() => generateMaze(15, 15)} />
        <Button label='solve maze' onClick={() => solve(false)} />
      </div>
    </div>
  );
}

export default App;
