export default class Distances {
  constructor(root) {
    this.root = root;
    this.cells = new Map();
    this.set(this.root, 0);
  }

  at(cell) {
    return this.cells.get(cell);
  }

  set(cell, distance) {
    this.cells.set(cell, distance);
  }

  has(cell) {
    return this.cells.has(cell);
  }
}