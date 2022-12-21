import './App.css';
import GridVis from './Components/GridVis';
import Button from './Components/Button';
import { GlobalContext, GlobalProvider } from './Context/GlobalState';
import React, { useContext, useEffect } from 'react';
import Toggle from './Components/Toggle';
import ModeSelect from './Components/ModeSelect';
import GridVis2p from './Components/GridVis2p';

const App = () => {
  return (
    <GlobalProvider>
      <Main />
    </GlobalProvider>
  )
};

const Main = () => {
  const {
    grid,
    generateMaze,
    position,
    darkMode,
    solve,
    toggleDarkMode,
    changeMode,
    players
  } = useContext(GlobalContext);

  useEffect(() => {
    if (position === grid.at(grid.rows - 1, grid.columns - 1)) {
      solve(true);
    }
  }, [position]);

  return (
    <div className='App' style={{
      color: darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)',
    }}>
      <div className='header'>
        <ModeSelect onChange={(players) => changeMode(players)} />
        <h1 className='title'>LAZE</h1>
        <Toggle onChange={(mode) => toggleDarkMode(mode)} />
      </div>
      {
        players === 1
          ? (<>
            <GridVis grid={grid} />
            <div className='buttonTray' style={{
              color: darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)',
            }}>
              <Button label='NEW MAZE' onClick={() => generateMaze(10, 10)} />
              <Button label='SOLVE MAZE' secondary='true' onClick={() => solve(false)} />
            </div>
          </>)
          : (<>
            <GridVis2p />
            <div className='buttonTray' style={{
              color: darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)',
            }}>
              <Button label='START ROOM' onClick={(socket) => socket.emit('createRoom')} />
              <Button label='JOIN ROOM' secondary='true' />
            </div>
          </>)
      }

    </div>
  );
};

export default App;
