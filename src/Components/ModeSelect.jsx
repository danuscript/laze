import React, { useState, useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

const ModeSelect = ({onChange}) => {
  const [mode, setMode] = useState('1P');
  const { darkMode } = useContext(GlobalContext);

  const handleModeChange = (event) => {
    setMode(event.target.value);
    onChange(+event.target.value[0]);
  };

  

  const bgColor = darkMode ? 'var(--darkGray)' : 'var(--lightGray';

  return (
    <div className="mode-select">
      <label className={`mode-option ${mode === '1P' ? 'active' : ''}`}>
        <input
          type="radio"
          value="1P"
          checked={mode === '1P'}
          onChange={handleModeChange}
        />
        <div className='playerLabel' style={{ color: mode === '1P' ? bgColor : 'currentcolor'}}>1P</div>
        
      </label>
      <label className={`mode-option mode-right ${mode === '2P' ? 'active' : ''}`}>
        <input
          type="radio"
          value="2P"
          checked={mode === '2P'}
          onChange={handleModeChange}
        />
        <div className='playerLabel' style={{ color: mode === '2P' ? bgColor : 'currentcolor'}}>2P</div>
      </label>
    </div>
  );
};

export default ModeSelect;
