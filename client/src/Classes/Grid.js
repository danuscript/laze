import Cell from "./Cell";

export default class Grid {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.grid = this.prepareGrid();
    this.configureCells();
  }

  prepareGrid() {
    return new Array(this.rows).fill(0).map((_, row) => (
      new Array(this.columns).fill(0).map((__, column) => (
        new Cell(row, column)
      ))
    ));
  }

  configureCells() {
    for (const cell of this.eachCell()) {
      const { row, column } = cell;
      cell.north = this.at(row - 1, column);
      cell.south = this.at(row + 1, column);
      cell.west = this.at(row, column - 1);
      cell.east = this.at(row, column + 1);
    }
  }

  * eachCell() {
    for (const row of this.grid) {
      for (const cell of row) {
        if (cell) yield cell;
      }
    }
  }

  * eachRow() {
    for (const row of this.grid) {
      yield row;
    }
  }

  at(row, column) {
    if (row < 0 || row >= this.rows || column < 0 || column >= this.columns) return null;
    return this.grid[row][column];
  }

  randomCell() {
    const row = Math.floor(Math.random() * this.rows);
    const column = Math.floor(Math.random() * this.columns);
    return this.at(row, column);
  }

  toString() {
    let output = `+${'---+'.repeat(this.columns)}\n`;
    for (const row of this.eachRow()) {
      let top = '|';
      let bottom = '+';

      for (let cell of row) {
        if (!cell) cell = new Cell(-1, -1);

        const body = ` ${this.contentsOf(cell)} `;
        const eastBoundary = (cell.linked(cell.east) ? ' ' : '|');
        top += `${body}${eastBoundary}`;

        const southBoundary = (cell.linked(cell.south) ? '   ' : '---');
        const corner = '+';
        bottom += `${southBoundary}${corner}`;
      }
      output += `${top}\n${bottom}\n`;
    }
    return output;
  }

  addWalls() {
    for (let cell of this.eachCell()) {
      if (!cell) cell = new Cell(-1, -1);

      if (!cell.row) cell.northWall = true;
      if (!cell.column) cell.westWall = true;
      if (!cell.linked(cell.east)) cell.eastWall = true;
      if (!cell.linked(cell.south)) cell.southWall = true;
    }
  }

  get size() {
    return this.rows * this.columns;
  }

  contentsOf(cell) {
    return ' ';
  }
}