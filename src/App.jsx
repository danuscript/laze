import Grid from './Classes/Grid';
import DistanceGrid from './Classes/DistanceGrid'
import Sidewinder from './Algorithms/Sidewinder';
import AldousBroder from './Algorithms/AldousBroder';
import BinaryTree from './Algorithms/BinaryTree'
import './App.css';
import GridVis from './Components/GridVis'

const grid = new DistanceGrid(25, 25);
AldousBroder.on(grid);
grid.addWalls();

// start at middle
// const start = grid.at(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2));

// start at end
const start = grid.at(0, 0);

const distances = start.distances();

// fully numbered distance map from start
grid.distances = distances;

// path between start and point B
grid.distances = distances.pathTo(grid.at(grid.rows - 1, grid.columns - 1));

// for longest path in mazes
// const [newStart] = distances.max();
// const newDistances = newStart.distances();
// const [goal] = newDistances.max();
// grid.distances = newDistances.pathTo(goal);


function App() {
  return (
    <div className="App">
    <GridVis grid={grid}/>
    </div>
  );
}

export default App;
