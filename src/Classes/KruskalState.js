export default class KruskalState {
  constructor(grid) {
    this.grid = grid;
    this.neighbors = [];
    this.setForCell = new Map();
    this.cellsInSet = new Map();

    for (const cell of grid.eachCell()) {
      const set = this.setForCell.size;
      this.setForCell.set(cell, set);
      this.cellsInSet.set(set, [cell]);

      if (cell.south) this.neighbors.push([cell, cell.south]);
      if (cell.east) this.neighbors.push([cell, cell.east]);
    }
  }

  canMerge(left, right) {
    return this.setForCell.get(left) !== this.setForCell.get(right);
  }

  merge(left, right) {
    left.link(right);

    const winner = this.setForCell.get(left);
    const loser = this.setForCell.get(right);
    const losers = this.cellsInSet.get(loser) || [right];

    for (const cell of losers) {
      this.cellsInSet.get(winner).push(cell);
      this.setForCell.set(cell, winner);
    }

    this.cellsInSet.delete(loser);
  }
}