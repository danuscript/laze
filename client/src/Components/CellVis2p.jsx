import React, { useContext } from "react";
import { GlobalContext  } from "../Context/GlobalState";

export default function Cell2p({cell, p1Path, p2Path}) {
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

  let { red, green, blue } = rgbGradient(pathOffset);

  const pathStyle = {
    backgroundColor: `rgba(${red}, ${green}, ${blue}, ${+(key in p1Path)})`,
  };


  return (
    <div className='cell' style={walls}>
      <div className='pathBackground' style={pathStyle}></div>
    </div>
  );
}