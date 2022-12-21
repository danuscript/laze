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

      return { ...state, ...newState};
    }

    case 'MOVE': {
      const directions = { Up: 'north', Down: 'south', Left: 'west', Right: 'east' };
      let direction = directions[action.payload];
      let { solved, path, position } = state;
      if (solved) return state;
      const next = position[direction];
      if (position.linked(next) && path.has(next)) {
        path.delete(position);
        position = next;
      } else if (next && position.linked(next)) {
        path.set(next, path.size);
        position = next;
      }
      return { ...state, path, position };
    }

    case 'SOLVE': {
      return { ...state, solved: true };
    }

    case 'TOGGLE_DARK_MODE': {
      const mode = action.payload ? 'dark' : 'light';
      document.body.style.backgroundColor = `var(--${mode}Gray)`;
      return { ...state, darkMode: action.payload };
    }
    
    case 'CHANGE_MODE': {
      return { ...state, players: action.payload };
    }

    case 'SET_SOCKET': {
      return { ...state, socket: action.payload };
    }

    case 'OPEN_JOIN_FORM': {
      return { ...state, joinForm: action.payload };
    }

    default: return state;
  }
}