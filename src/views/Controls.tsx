import { useStore } from "@nanostores/preact";
import {
  setInSetup,
  setIsRunning,
  setIsStable,
  setNewUniverse,
  store,
  TState,
} from "../stores/store";
import { WritableAtom } from "nanostores";

const Controls = () => {
  const state = useStore(store);
  const { universe, inSetup, isRunning } = state;
  const onSetupClick = () => {
    setInSetup(!inSetup);
  };

  const onStartClick = () => {
    setIsRunning(true);
  };

  const onNewClick = () => {
    setIsRunning(false);
    setInSetup(false);
    setIsStable(false);
    setNewUniverse();
  };

  const status = universe.reduce(
    (summary, row) => {
      return row.reduce((summary, cell) => {
        cell ? summary.alive++ : summary.dead++;
        return summary;
      }, summary);
    },
    { alive: 0, dead: 0 }
  );

  return (
    <>
      <div class="row text-center">
        <div className="col">
          <h5>
            Alive: {status.alive} | Dead: {status.dead}
          </h5>
        </div>
      </div>
      <div className="row text-center">
        <div className="col d-grid gap-2">
          <button className="btn btn-primary" onClick={onSetupClick}>
            {inSetup ? "Play" : "Setup"}
          </button>
          <button className="btn btn-success" onClick={onNewClick}>
            New Universe
          </button>
          <button
            className={isRunning ? "btn btn-danger" : "btn btn-success"}
            onClick={onStartClick}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          {inSetup ? "abc" : null}
        </div>
      </div>
    </>
  );
};

export default Controls;
