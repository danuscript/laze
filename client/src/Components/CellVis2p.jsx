import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";

export default function Cell2p({ cell, pathA, pathB, grid, player1 }) {
  const p1Path = player1 ? pathA : pathB;
  const p2Path = player1 ? pathB : pathA;

  const { darkMode } = useContext(GlobalContext);

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
      blue: Math.max(204 + offset * -0.275, 193)

    }
    return darkMode ? dark : light;
  };

  const key = `${cell.row},${cell.column}`;

  const pathOffset = key in p1Path ? p1Path[key].idx : 0;

  const path2Offset = key in p2Path ? p2Path[key].idx : 0;

  let { red, green, blue } = rgbGradient(pathOffset);

  const pathStyle = {
    backgroundColor: `rgba(${red}, ${green}, ${blue}, ${+(key in p1Path)})`,
  };

  ({ red, green, blue } = rgbGradient(path2Offset));

  const p2Background = {
    backgroundColor: `rgba(${red}, ${green}, ${blue})`,
    height: `${1 / grid.length * 100}%`,
    width: `${1 / grid[0].length * 100}%`,
    borderRadius: '100%',
    scale: '0.25',
    opacity: `${+(key in p2Path)}`
  };

  if (player1) {
    if (!cell.row && !cell.column) walls.borderLeft = '0';
    if (cell.row === grid.length - 1 && cell.column === grid[0].length - 1) {
      walls.borderRight = '0';
    }
  } else {
    if (!cell.row && cell.column === grid[0].length - 1) walls.borderRight = '0';
    if (!cell.column && cell.row === grid.length - 1) walls.borderLeft = '0';
  }

  return (
    <div className='cell' style={walls}>
      <div className='pathBackground' style={pathStyle}></div>
      <div className="solutionBackground" style={p2Background}></div>
    </div>
  );
}