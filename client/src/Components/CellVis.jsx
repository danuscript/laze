import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

export default function Cell({ cell, distance }) {
  const { solved, path, grid, darkMode } = useContext(GlobalContext)
  const wallColor = darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)'
  const walls = {
    borderLeft: `${cell.westWall ? `4px solid ${wallColor}` : '0'}`,
    borderRight: `${cell.eastWall ? `4px solid ${wallColor}` : '0'}`,
    borderTop: `${cell.northWall ? `4px solid ${wallColor}` : '0'}`,
    borderBottom: `${cell.southWall ? `4px solid ${wallColor}` : '0'}`,
  }

  const rgbGradient = (offset) => {
    const light = {
      red: Math.min(145 + offset * 1.8, 217),
      green: Math.max(233 + offset * -1.425, 176),
      blue: Math.max(242 + offset * -0.8, 210),
    };

    const dark = {
      red: Math.min(104 + offset * 1.575, 167),
      green: 121,
      blue: Math.max(204 + offset * -0.275, 193),
    }
    return darkMode ? dark : light;
  };

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

  if (!cell.row && !cell.column) walls.borderLeft = '0';
  if (cell.row === grid.rows - 1 && cell.column === grid.columns - 1) {
    walls.borderRight = '0';
  }

  return (
    <div className='cell' style={walls}>
      <div className='pathBackground' style={pathStyle}></div>
      <div className="solutionBackground" style={solutionBackground}></div>
    </div>
  );
};

