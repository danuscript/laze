import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import Button from './Button';

const Form = () => {
  const inputRef = React.createRef();

  const { socket, darkMode } = useContext(GlobalContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = inputRef.current.value.toLowerCase();
    socket.emit('joinRoom', inputValue);
  };

  const backgroundColor = darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)';
  const color = darkMode ? 'var(--darkGray)' : 'var(--lightGray)';

  const inputStyle = {
    height: '2.5em',
    border: `2px solid ${backgroundColor}`,
    color: backgroundColor,
    background: 'none',
    paddingLeft: '0.75em',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    fontSize: 'medium',
    margin: '0',
    fontFamily: 'Josefin Sans',
    borderRight: '0px',
    '--placeholder-color': backgroundColor,
  }

  const buttonStyle = {
    border: 'none',
    width: 'auto',
    margin: '0',
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    color,
    backgroundColor,
  }

  const formStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const placeholderStyle = `.inputField::placeholder{
    opacity: 0.5;
    color: ${backgroundColor};
  }`

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input type="text" ref={inputRef} placeholder="ABC123" style={inputStyle} />
      <button type="submit"  className='testClass' style={buttonStyle}>Submit</button>
    </form>
  );
};

export default Form;
