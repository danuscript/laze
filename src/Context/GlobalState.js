import React, { createContext, useReducer } from 'react';
import DistanceGrid from '../Classes/DistanceGrid';
import AppReducer from './AppReducer'
import Kruskals from '../Classes/Kruskals';

const initialState = {
  grid: new DistanceGrid(15, 15),
  path: new Map(),
  position: null,
  solved: false,
};

const { grid, path } = initialState;
Kruskals.on(grid);
grid.addWalls();
const start = grid.at(0, 0);
path.set(start, 0);
initialState.position = start;
const distances = start.distances();
grid.distances = distances.pathTo(grid.at(grid.rows - 1, grid.columns - 1));

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const generateMaze = (rows, columns) => {
    dispatch({
      type: 'GENERATE_MAZE',
      payload: { rows, columns },
    })
  };

  const move = (direction) => {
    dispatch({
      type: 'MOVE',
      payload: direction,
    })
  };

  const solve = () => {
    dispatch({
      type: 'SOLVE',
    })
  };

  const values = {
    grid: state.grid,
    path: state.path,
    position: state.position,
    solved: state.solved,
    generateMaze,
    move,
    solve
  };

  return (
    <GlobalContext.Provider value={values}>
      {children}
    </GlobalContext.Provider>
  )
}



