const move = (maze, dir, position, path) => {
  const directions = {
    Up: 'north', Down: 'south', Left: 'west', Right: 'east',
  };

  const deltas = {
    north: [-1, 0], south: [1, 0], west: [0, -1], east: [0, 1],
  };

  const direction = directions[dir];
  const [a, b] = deltas[direction];
  const [row, col] = position;

  if (maze[row][col][direction] && `${row + a},${col + b}` in path) {
    delete path[`${row},${col}`];
    position[0] += a;
    position[1] += b;
    path.length -= 1;
  } else if (maze[row][col][direction]) {
    position[0] += a;
    position[1] += b;
    const newKey = `${position[0]},${position[1]}`;
    path[newKey] = { cell: maze[position[0]][position[1]], idx: path.length + 1 };
    path.length += 1;
  }
};

module.exports = move;
