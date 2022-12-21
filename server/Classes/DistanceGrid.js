const Grid = require('./Grid');

class DistanceGrid extends Grid {
  contentsOf(cell) {
    if (this.distances && this.distances.has(cell)) {
      return this.distances.at(cell);
    }
    return super.contentsOf(cell);
  }
}

module.exports = DistanceGrid;
