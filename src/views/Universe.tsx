import { TUniverse, TUniverseRow } from "../stores/universe";
import { store, TState } from "../stores/store";
import { useStore } from "@nanostores/preact";

type TOnToggleClick = (evt: MouseEvent) => void;

function Universe({ onToggleClick }: { onToggleClick?: TOnToggleClick }) {
  const { inSetup, universe } = useStore(store);
  return (
    <div class="u-table-container">
      <table class={inSetup ? "u-table in-setup" : "u-table"}>
        <tbody>
          {universe.map((row: TUniverseRow, rowIdx) => {
            return (
              <tr>
                {row.map((cell, cellIdx) => (
                  <td>
                    <div
                      className={
                        cell
                          ? "ratio ratio-1x1 cell alive"
                          : "ratio ratio-1x1 cell dead"
                      }
                      data-row={rowIdx}
                      data-col={cellIdx}
                      onClick={onToggleClick}
                    >
                      &nbsp;
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Universe;
