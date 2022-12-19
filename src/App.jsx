import './App.css';
import GridVis from './Components/GridVis';
import Button from './Components/Button';
import { GlobalContext, GlobalProvider } from './Context/GlobalState';
import React, { useContext, useEffect } from 'react';
import Toggle from './Components/Toggle';
import ModeSelect from './Components/ModeSelect';

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
        <ModeSelect />
        <h1 className='title'>LAZE</h1>
        <Toggle onChange={onChange} />
      </div>
      <GridVis grid={grid} />
      <div className='buttonTray' style={{color: darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)'}}>
        <Button label='NEW MAZE' onClick={() => generateMaze(25, 25)} />
        <Button label='SOLVE MAZE' secondary='true' onClick={() => solve(false)} />
      </div>
    </div>
  );
}

export default App;
