import KruskalState from "./KruskalState";

export default class Kruskals {
  static on(grid, state = new KruskalState(grid)) {
    const neighbors = shuffle(state.neighbors);

    while (neighbors.length) {
      const [left, right] = neighbors.pop();
      if (state.canMerge(left, right)) state.merge(left, right);
    }

    return grid;
  }
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}