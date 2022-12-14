import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

export default function Cell({ cell, distance }) {
  const { solved, path, grid } = useContext(GlobalContext)
  const walls = {
    borderLeft: `${cell.westWall ? '4px solid var(--darkBlue)' : '0'}`,
    borderRight: `${cell.eastWall ? '4px solid var(--midBlue)' : '0'}`,
    borderTop: `${cell.northWall ? '4px solid var(--midBlue)' : '0'}`,
    borderBottom: `${cell.southWall ? '4px solid var(--darkBlue)' : '0'}`,
  }

  const pathOffset = path.get(cell) || 0;
  const solutionOffset = +distance || 0;

  let { red, green, blue } = rgbGradient(pathOffset);

  const pathStyle = {
    backgroundColor: `rgba(${red}, ${green}, ${blue}, ${+path.has(cell)})`,
  };

  ({ red, green, blue } = rgbGradient(solutionOffset));

  const solutionBackground = {
    backgroundColor: `rgba(${red}, ${green}, ${blue}, ${+distance})`,
    height: `${1 / grid.rows * 100}%`,
    width: `${1 / grid.columns * 100}%`,
    borderRadius: '100%',
    scale: '0.25',
    opacity: `${+solved}`,
  }

  return (
    <div className='cell' style={walls}>
      <div className='pathBackground' style={pathStyle}></div>
      <div className="solutionBackground" style={solutionBackground}></div>
    </div>
  );
};

const rgbGradient = (offset) => ({
  red: Math.min(145 + offset * 1.8, 217),
  green: Math.max(233 + offset * -1.425, 176),
  blue: Math.max(242 + offset * -0.8, 210),
});