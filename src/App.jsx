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
  const { grid, generateMaze, move, position, darkMode, solve, toggleDarkMode, changeMode, players} = useContext(GlobalContext);

  useEffect(() => {
    const handleKey = ({ key }) => {
      if (key.includes('Arrow')) {
        const direction = key.slice(5);
        if (players === 1) move(directions[direction]);
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

  const onModeChange = (players) => changeMode(players);

  const onChange = (mode) => toggleDarkMode(mode);

  return (
    <div className='App' style={{color: darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)'}}>
      <div className='header'>
        <ModeSelect onChange={onModeChange}/>
        <h1 className='title'>LAZE</h1>
        <Toggle onChange={onChange} />
      </div>
      <GridVis grid={grid} mode='1p'/>
      <GridVis mode='2p'/>
      <div className='buttonTray' style={{color: darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)'}}>
        <Button label='NEW MAZE' onClick={() => generateMaze(10, 10)} />
        <Button label='SOLVE MAZE' secondary='true' onClick={() => solve(false)} />
      </div>
    </div>
  );
}

export default App;
