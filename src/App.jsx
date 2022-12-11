import Grid from './Classes/Grid';
import DistanceGrid from './Classes/DistanceGrid'
import Sidewinder from './Algorithms/Sidewinder';
import './App.css';
import GridVis from './Components/GridVis'

const grid = new DistanceGrid(15, 25);
Sidewinder.on(grid);
grid.addWalls();

// for distance grid
const start = grid.at(0, 0);
const distances = start.distances();
grid.distances = distances;

function App() {
  return (
    <div className="App">
    <GridVis grid={grid}/>
    </div>
  );
}

export default App;
