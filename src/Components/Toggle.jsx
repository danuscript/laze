import React, { useState } from 'react';

export default function Toggle({ onChange }) {
  const [checked, setChecked] = useState(true);
  const handleChange = () => {
    setChecked(!checked);
    onChange(checked);
  }

  return (
    <>
      <label className='toggleContainer'>
        <input id='checkbox' type='checkbox' onChange={handleChange}></input>
        <span className='toggle'></span>
      </label>
    </>
  )
} 