import { formatterList, isNullOrUndefined, buildURLSearchParams } from "./helpers";

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

  describe("buildURLSearchParams", () => {
    const tableCases = [null, undefined, {}];
    it.each(tableCases)("should build an URL Search Params when passes %p", (testValue) => {
      // @ts-ignore - Proposal tests.
      const result = buildURLSearchParams(testValue);
      expect(result.toString()).toBe("");
    });

    it("should build a correct URL Search Params with different types", () => {
      const data = {
        name: "name",
        age: 24,
        isActive: true,
        types: ["type-1", "type-2"],
        ignoreMe: undefined,
        ignoreMeToo: "",
      };
      const result = buildURLSearchParams(data);
      expect(result.toString()).toBe("name=name&age=24&isActive=true&types=type-1%2Ctype-2");
    });
  });
});
