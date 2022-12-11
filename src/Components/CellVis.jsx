export default function Cell({ cell }) {
  const style = {
    borderLeft: `${cell.westWall ? '0.125em solid black' : '0'}`,
    borderRight: `${cell.eastWall ? '0.125em solid black' : '0'}`,
    borderTop: `${cell.northWall ? '0.125em solid black' : '0'}`,
    borderBottom: `${cell.southWall ? '0.125em solid black' : '0'}`,
  }
  return (
    <div className='cell' style={style}>
    </div>
  );
};
