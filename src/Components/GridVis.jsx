import CellVis from './CellVis';

export default function Grid({ grid }) {
  const maze = [];
  for (const row of grid.eachRow()) {
    maze.push(row.map((cell) => <CellVis cell={cell} />))
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
