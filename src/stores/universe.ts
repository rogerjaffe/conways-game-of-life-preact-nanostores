export type TPosition = { row: number; col: number };
export type TUniverseRow = boolean[];
export type TUniverse = TUniverseRow[];

export const initUniverse = (
  aliveProbability: number,
  rows: number,
  cols: number
): TUniverse => {
  let u = [];
  for (let i = 0; i < rows; i++) {
    let r = [];
    for (let j = 0; j < cols; j++) {
      r.push(Math.random() < aliveProbability);
    }
    u.push(r);
  }
  return u;
};

export const countNeighbors = (u: TUniverse, pos: TPosition): number => {
  let liveNeighbors = 0;
  let ROWS = u.length;
  let COLS = u[0].length;
  for (let r = pos.row - 1; r <= pos.row + 1; r++) {
    for (let c = pos.col - 1; c <= pos.col + 1; c++) {
      if (0 <= r && r < ROWS && 0 <= c && c < COLS) {
        liveNeighbors += u[r][c] ? 1 : 0;
      }
    }
  }
  return liveNeighbors;
};

export const getNewState = (
  currentState: boolean,
  liveNeighbors: number
): boolean => {
  if (currentState) {
    // Live cell
    if (liveNeighbors < 2 || liveNeighbors > 3) {
      // 2 or 3 neighbors
      return false;
    }
  } else {
    // Dead cell
    if (liveNeighbors === 3) {
      return true;
    }
  }
  return currentState;
};
