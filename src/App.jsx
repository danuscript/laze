import Grid from './Classes/Grid';
import Sidewinder from './Algorithms/Sidewinder';
import './App.css';
import GridVis from './Components/GridVis'

const grid = new Grid(15, 25);
Sidewinder.on(grid);
grid.addWalls();

function App() {
  return (
    <div className="App">
    <GridVis grid={grid}/>
    </div>
  );
}

export default App;
