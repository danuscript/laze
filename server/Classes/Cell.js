const Distances = require('./Distances');

class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.links = new Map();

    this.north = null;
    this.south = null;
    this.east = null;
    this.west = null;

    this.northWall = false;
    this.southWall = false;
    this.eastWall = false;
    this.westWall = false;
  }

  link(cell, bidi = true) {
    this.links.set(cell, true);
    if (bidi) cell.link(this, false);
    return this;
  }

  unlink(cell, bidi = true) {
    this.links.delete(cell);
    if (bidi) cell.unlink(this, false);
    return this;
  }

  linked(cell) {
    return this.links.has(cell);
  }

  neighbors() {
    return [this.north, this.south, this.east, this.west].filter((dir) => dir);
  }

  distances() {
    const distances = new Distances(this);
    let frontier = [this];

    while (frontier.length) {
      const newFrontier = [];
      for (const cell of frontier) {
        for (const linked of cell.links.keys()) {
          if (!distances.has(linked)) {
            distances.set(linked, distances.at(cell) + 1);
            newFrontier.push(linked);
          }
        }
      }
      frontier = newFrontier;
    }
    return distances;
  }
}

module.exports = Cell;
