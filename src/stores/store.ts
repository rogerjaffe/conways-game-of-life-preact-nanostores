import { action, atom } from "nanostores";
import {
  countNeighbors,
  getNewState,
  initUniverse,
  TPosition,
  TUniverse,
} from "./universe";
import { ALIVE_PROBABILITY, COLS, ROWS } from "../utilities/constants";
import { actionCreator } from "./actionCreator";

export type TState = {
  universe: TUniverse;
  isRunning: boolean;
  inSetup: boolean;
  isStable: boolean;
  generation: number;
};

export const store = atom<TState>({
  universe: initUniverse(ALIVE_PROBABILITY, ROWS, COLS),
  isRunning: false,
  inSetup: false,
  isStable: false,
  generation: 0,
});

export const generateNextStateAction = actionCreator<TState, never>(
  store,
  "generateNextState",
  (state: TState): TState => {
    console.log("generateNextStateAction");
    if (!state.isRunning || state.inSetup || state.isStable) return state;
    const nextUniverse = [];
    for (let row = 0; row < ROWS; row++) {
      nextUniverse.push([] as boolean[]);
      for (let col = 0; col < COLS; col++) {
        const count = countNeighbors(state.universe, { row, col });
        const newCellState = getNewState(state.universe[row][col], count);
        nextUniverse[row].push(newCellState);
      }
    }
    return {
      ...state,
      isStable: JSON.stringify(state.universe) === JSON.stringify(nextUniverse),
      universe: nextUniverse,
      generation: state.generation + 1,
    };
  }
);

export const setIsRunning = actionCreator<TState, boolean>(
  store,
  "setIsRunning",
  (state, isRunning): TState => {
    return { ...state, isRunning };
  }
);

export const setIsStable = actionCreator<TState, boolean>(
  store,
  "setIsStable",
  (state, isStable): TState => {
    return { ...state, isStable };
  }
);

export const setInSetup = actionCreator<TState, boolean>(
  store,
  "setInSetup",
  (state, inSetup): TState => {
    if (!inSetup) {
      return { ...state, inSetup, isStable: false, isRunning: true };
    }
    return { ...state, inSetup, isRunning: false };
  }
);

export const toggleCell = actionCreator<TState, TPosition>(
  store,
  "toggle",
  (state, { row, col }): TState => {
    const universe = JSON.parse(JSON.stringify(state.universe));
    universe[row][col] = !universe[row][col];
    return { ...state, universe };
  }
);

export const setNewUniverse = actionCreator<TState, never>(
  store,
  "newUniverse",
  (state) => {
    return {
      ...state,
      universe: initUniverse(ALIVE_PROBABILITY, ROWS, COLS),
    };
  }
);
