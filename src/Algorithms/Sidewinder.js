export default class Sidewinder {
  static on(grid) {
    for (const row of grid.eachRow()) {
      const run = [];

      for (const cell of row) {
        run.push(cell);

        const atEasternBoundary = !cell.east;
        const atNorthernBoundary = !cell.north;

        const shouldCloseOut = atEasternBoundary
          || (!atNorthernBoundary && Math.random() <= 0.5);

        if (shouldCloseOut) {
          const index = Math.floor(Math.random() * run.length);
          const member = run[index];
          if (member.north) member.link(member.north);
          run.length = 0;
        } else cell.link(cell.east);
      }
    }
    return grid;
  }
}