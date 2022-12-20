import Grid from './Grid'

export default class DistanceGrid extends Grid {
  contentsOf(cell) {
    if (this.distances && this.distances.has(cell)) {
      return this.distances.at(cell);
    }
    return super.contentsOf(cell);
  }
}
