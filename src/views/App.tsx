import { useStore } from "@nanostores/preact";
import { router } from "../router";
import { usePageTracking } from "../utilities/preact-google-analytics";
import Controls from "./Controls";
import Universe from "./Universe";
import { useUniverseHistory } from "../hooks/useUniverseHistory";
import { useInterval } from "../hooks/useInterval";
import {
  generateNextStateAction,
  setInSetup,
  setIsRunning,
  store,
  toggleCell,
} from "../stores/store";

function App() {
  usePageTracking();

  const page = useStore(router);
  const state = useStore(store);
  console.log(state);
  const { universe, inSetup, isRunning } = useStore(store);
  const universeHistory = useUniverseHistory(universe);
  const cancel = useInterval(() => generateNextStateAction(), 1000);

  const onToggleClick = (evt: MouseEvent) => {
    if (!inSetup) return;
    const target = evt.target as HTMLElement;
    const row = parseInt(target.getAttribute("data-row") || "0");
    const col = parseInt(target.getAttribute("data-col") || "0");
    toggleCell({ row, col });
  };

  const onSetupClick = () => {
    setInSetup(!inSetup);
  };

  const onStartClick = () => {
    setIsRunning(true);
  };

  let c = null;
  if (!page) {
    c = (
      <div>
        Bad route! Go to <a href="/">Play</a>
      </div>
    );
  } else if (page.route === "play") {
    c = (
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-12">
              <h1 class="text-center">Conway's Game of Life!</h1>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-9">
              <Universe onToggleClick={onToggleClick} />
            </div>
            <div class="col-md-3">
              <Controls />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <>{c}</>;
}

export default App;
