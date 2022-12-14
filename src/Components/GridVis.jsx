import CellVis from './CellVis';

export default function Grid({ grid }) {
  const maze = [];
  for (const row of grid.eachRow()) {
    maze.push(row.map((cell) => <CellVis key={`${cell.row},${cell.column}`} cell={cell} distance={grid.contentsOf(cell)}/>))
  }

  const style = {
    gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
    aspectRatio: `${grid.columns} / ${grid.rows}`,
  }

  return (
    <div className='grid' style={style}>
      {maze}
    </div>
  );
};
