export default function Cell({ cell, distance }) {
  const color = 255 - distance * 3;
  const walls = {
    borderLeft: `${cell.westWall ? '0.125em solid black' : '0'}`,
    borderRight: `${cell.eastWall ? '0.125em solid black' : '0'}`,
    borderTop: `${cell.northWall ? '0.125em solid black' : '0'}`,
    borderBottom: `${cell.southWall ? '0.125em solid black' : '0'}`,
  }
  const backgroundColor = {
    backgroundColor: `rgb(${color}, ${color + 20}, ${color + 35})`,
  }

  return (
    <div className='cell' style={walls}>
      <div className="cellBackground" style={backgroundColor}></div>
    </div>
  );
};
