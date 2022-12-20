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

  pathTo(goal) {
    let current = goal;
    
    const breadcrumbs = new Distances(this.root);
    breadcrumbs.set(current, this.at(current));

    while (current !== this.root) {
      for (const neighbor of current.links.keys()) {
        if (this.at(neighbor) < this.at(current)) {
          breadcrumbs.set(neighbor, this.at(neighbor));
          current = neighbor;
          break;
        }
      }
    }
    return breadcrumbs;
  }

  max() {
    let maxDistance = 0;
    let maxCell = this.root;

    for (const [cell, distance] of this.cells.entries()) {
      if (distance > maxDistance) {
        maxCell = cell;
        maxDistance = distance;
      }
    }
    return [maxCell, maxDistance];
  }
}