import { useState } from "preact/compat";
import { useEffect } from "preact/hooks";
import { TUniverse } from "../stores/universe";

const MAX_HISTORY = 10;

export const useUniverseHistory = (universe: TUniverse) => {
  const [universeHistory, setUniverseHistory] = useState<TUniverse[]>([]);
  const [stable, setStable] = useState(false);
  const universeJSON = JSON.stringify(universe);

  useEffect(() => {
    universeHistory.push(universe);
    setUniverseHistory(universeHistory);
    if (universeHistory.length >= MAX_HISTORY) {
      universeHistory.shift();
    }
  }, [universeJSON]);

  return universeHistory;
};
