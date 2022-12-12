export default class AldousBroder {
  static on(grid) {
    let cell = grid.randomCell();
    let unvisited = grid.size - 1;

    while (unvisited) {
      const index = Math.floor(Math.random() * cell.neighbors().length)
      const neighbor = cell.neighbors()[index];

      if (!neighbor.links.size) {
        cell.link(neighbor);
        unvisited -= 1;
      }
      cell = neighbor;
    }
    return grid;
  }
}