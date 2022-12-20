import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";

export default function Button({ label, onClick, secondary }) {
  const { darkMode } = useContext(GlobalContext);
  let backgroundColor = darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)';
  if (secondary) backgroundColor = darkMode ? 'var(--darkGray)' : 'var(--lightGray)';
  let color = darkMode ? 'var(--darkGray)' : 'var(--lightGray)';
  if (secondary) color = darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)';
  return (
    <>
      <button style={{
        color,
        backgroundColor,
        border: `3px solid ${darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)'}`
      }} onClick={onClick}>{label}</button>
    </>
  )
}