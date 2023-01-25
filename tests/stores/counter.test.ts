import { beforeEach, describe, test, expect } from "vitest";
import { universe, counterIncrease } from "../../src/stores/universe";
import { WritableAtom } from "nanostores";

describe("counterIncrease", () => {
  beforeEach(() => {
    universe.set(0);
  });

  test("check initial amount, add 10, subtract 5", () => {
    expect(universe.get()).toEqual(0);
  });

  test("add 10", () => {
    counterIncrease(10);
    expect(universe.get()).toEqual(10);
  });

  test("subtract 10", () => {
    counterIncrease(-10);
    expect(universe.get()).toEqual(-10);
  });
});
