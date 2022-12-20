import CellVis from './CellVis';
import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

export default function Grid({ grid, mode }) {
  const { players, darkMode } = useContext(GlobalContext)
  let display = players === 1
  ? mode === '1p' ? '' : 'none'
  : mode === '1p' ? 'none' : '';
  if (!grid) return (
    <>
      <div className='grid' style={{
        height: 'calc(100vh - 1.35em - 7em)',
        border: `4px solid ${darkMode ? 'var(--lightBlue)' : 'var(--darkBlue)'}`,
        aspectRatio: '1 / 1',
        display: display,
      }}>

      </div>
    </>
  );
  const maze = [];
  for (const row of grid.eachRow()) {
    maze.push(row.map((cell) => <CellVis key={`${cell.row},${cell.column}`} cell={cell} distance={grid.contentsOf(cell)}/>))
  }

  const style = {
    gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
    aspectRatio: `${grid.columns} / ${grid.rows}`,
    display: display,
    outline: mode === '1p' ? '' : '3px solid red',
  }

  return (
    <div className='grid grid1' style={style}>
      {maze}
    </div>
  );
};
