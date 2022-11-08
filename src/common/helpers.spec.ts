import { formatterList, isNullOrUndefined } from "./helpers";

describe("Helpers", () => {
  describe("formatterList", () => {
    const tableCases = [
      ["", null],
      ["", undefined],
      ["", []],
      ["1, 2, 3", ["1", "2", "3"]],
    ];
    // @ts-ignore - Proposal tests.
    it.each(tableCases)("should return a %p when passes %p as value", (expected, list) => {
      const result = formatterList(list as string[]);
      expect(result).toEqual(expected);
    });
  });

  describe("isNullOrUndefined", () => {
    const tableCases = [
      [true, null],
      [true, undefined],
      [false, 0],
      [false, 1],
      [false, ""],
      [false, "a"],
    ];

    it.each(tableCases)(
      "should return %p when passes %p as value",
      // @ts-ignore - Proposal tests.
      (expected, value) => {
        const result = isNullOrUndefined(value);
        expect(result).toEqual(expected);
      }
    );
  });
});
