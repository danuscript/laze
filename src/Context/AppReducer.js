import Kruskals from '../Classes/Kruskals';
import DistanceGrid from '../Classes/DistanceGrid';

export default function reducer(state, action) {
  switch (action.type) {
    case 'GENERATE_MAZE': {
      const { rows, columns } = action.payload;
      const newState = {
        grid: new DistanceGrid(rows, columns),
        path: new Map(),
        position: null,
        solved: false,
      };

      const { grid, path } = newState;
      Kruskals.on(grid);
      grid.addWalls();
      const start = grid.at(0, 0);
      path.set(start, 0);
      newState.position = start;
      const distances = start.distances();
      grid.distances = distances.pathTo(grid.at(grid.rows - 1, grid.columns - 1));

      return newState;
    }

    case 'MOVE': {
      let direction = action.payload;
      let { solved, path, position } = state;
      if (solved) return state;
      const next = position[direction];
      if (position.linked(next) && path.has(next)) {
        path.delete(position);
        position = next;
      } else if (next && position.linked(next)) {
        path.set(next, path.size)
        position = next
      }
      return { ...state, path, position };
    }

    case 'SOLVE': {
      const solved = true;
      return {...state, solved};
    }

    default: return state;
  }
}