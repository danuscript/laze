import React, { useState, useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

export default function Toggle({ onChange }) {
  const [checked, setChecked] = useState(true);
  const { darkMode } = useContext(GlobalContext);
  const handleChange = () => {
    setChecked(!checked);
    onChange(checked);
  }

  return (
    <>
      <label className='toggleContainer' style={{ backgroundColor: darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)'}}>
        <input id='checkbox' type='checkbox' onChange={handleChange}></input>
        <span className='toggle'></span>
      </label>
    </>
  )
} 