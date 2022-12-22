import './App.css';
import GridVis from './Components/GridVis';
import Button from './Components/Button';
import { GlobalContext, GlobalProvider } from './Context/GlobalState';
import React, { useContext, useEffect, useRef } from 'react';
import Toggle from './Components/Toggle';
import ModeSelect from './Components/ModeSelect';
import GridVis2p from './Components/GridVis2p';
import { randomCode } from './Classes/RandomCode';
import toast, { Toaster } from 'react-hot-toast';

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
    players,
    socket,
    openJoinForm,
  } = useContext(GlobalContext);

  const toastStyle = {
    style: {
      backgroundColor: 'var(--darkBlue)',
      color: 'var(--lightGray)',
    },
    iconTheme: {
      primary: 'var(--lightGray)',
      secondary: 'var(--darkBlue)',
    },
    position: 'bottom-right',
  };

  const darkToast = {
    style: {
      backgroundColor: 'var(--lightBlue)',
      color: 'var(--darkGray)',
    },
    iconTheme: {
      primary: 'var(--darkGray)',
      secondary: 'var(--lightBlue)',
    },
    position: 'bottom-right',
  };

  const darkModeRef = useRef(darkMode);
  const socketRef = useRef(socket);
  const toastMode = (darkMode) => darkMode ? darkToast : toastStyle;
  let buttonToast = () => {
    toast((t) => (
      <span>
        <Button label='NEW GAME' onClick={() => {
          toast.dismiss(t.id);
          socketRef.current.emit('newGame');
        }} />
      </span>
    ), {
      duration: Infinity,
      position: 'bottom-left',
      style: {
        backgroundColor: 'transparent',
        boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
        padding: '0',
        filter: 'none',
      }
    });
  }

  let notify = (message, type = 'default') => {
    if (type === 'default') toast(message, toastMode(darkModeRef.current));
    else toast[type](message, toastMode(darkModeRef.current));
  }

  useEffect(() => {
    if (position === grid.at(grid.rows - 1, grid.columns - 1)) {
      solve(true);
    }
  }, [position]);

  useEffect(() => {
    darkModeRef.current = darkMode;
  }, [darkMode]);

  useEffect(() => {
    socketRef.current = socket;
  }, [socket]);

  return (
    <div className='App' style={{
      color: darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)',
    }}>
      <Toaster containerStyle={{
        top: 20,
        left: 20,
        bottom: 13,
        right: 20,
      }} />
      <div className='header'>
        <ModeSelect onChange={(players) => changeMode(players)} />
        <h1 className='title'>LAZE</h1>
        <Toggle onChange={(mode) => {
          toggleDarkMode(mode);
        }} />
      </div>
      {
        players === 1
          ? (<>
            <GridVis grid={grid} />
            <div className='buttonTray' style={{
              color: darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)',
            }}>
              <Button label='NEW MAZE' onClick={() => generateMaze(15, 15)} />
              <Button label='SOLVE MAZE' secondary='true' onClick={() => solve(false)} />
            </div>
          </>) : (<>
            <GridVis2p notify={notify} buttonToast={buttonToast} />
            <div className='buttonTray' style={{
              color: darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)',
            }}>
              <Button label='START ROOM' onClick={() => {
                socket.emit('createRoom', randomCode());
                openJoinForm(false);
              }} />
              <Button label='JOIN ROOM' secondary='true' onClick={() => openJoinForm(true)} />
            </div>
          </>)
      }

    </div>
  );
};

export default App;
