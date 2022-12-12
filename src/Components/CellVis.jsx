export default function Cell({ cell, distance }) {
  const color = 255 - distance * 3;
  const walls = {
    borderLeft: `${cell.westWall ? '4px solid black' : '0'}`,
    borderRight: `${cell.eastWall ? '4px solid black' : '0'}`,
    borderTop: `${cell.northWall ? '4px solid black' : '0'}`,
    borderBottom: `${cell.southWall ? '4px solid black' : '0'}`,
  }
  const backgroundColor = {
    backgroundColor: `rgb(${color}, ${color + 20}, ${color + 35})`,
    // backgroundColor: `${typeof distance === 'number' ? 'teal' : 'white'}`
  }

  return (
    <div className='cell' style={walls}>
      {/* <div className="cellBackground" style={backgroundColor}></div> */}
    </div>
  );
};
