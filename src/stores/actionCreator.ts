import { action, WritableAtom } from "nanostores";

export function actionCreator<T, O>(
  atom: WritableAtom<T>,
  name: string,
  fn: (a: T, b: O | never) => T
): any {
  return action(atom, name, (store: WritableAtom<T>, parms: O) =>
    store.set(fn(store.get(), parms))
  );
}
