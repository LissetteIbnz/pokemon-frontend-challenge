import { routes } from "./routes";

describe("Routes", () => {
  it("should create a child route", () => {
    expect(routes.detailsById("001")).toBe("/details/001");
  });
});
