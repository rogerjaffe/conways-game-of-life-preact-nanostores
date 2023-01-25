import { describe, expect, test } from "vitest";
import { atom } from "nanostores";
import { actionCreator } from "../../src/stores/actionCreator";

describe("actionCreator", () => {
  test("function generated", () => {
    const a = atom("String");
    const append = actionCreator(a, "append", (a, b) => b + a + b);
    append("-abc");
    expect(a.get()).toEqual("-abcString-abc");
  });
});
