import { env } from "core/environment";
import { pokemonRepository } from "./pokemon.repository";

const baseURL = env.baseURL;

describe("Pokemon repository", () => {
  let fetchMock: unknown;

  beforeEach(() => {
    fetchMock = jest.spyOn(global, "fetch").mockImplementation(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
        }) as Promise<Response>
    );
  });

  it("should call the pokemon endpoint", async () => {
    await pokemonRepository.getAll();

    expect(fetchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "GET",
        url: `${baseURL}/pokemon/?`,
      })
    );
  });

  it("should call the pokemon endpoint with query params", async () => {
    await pokemonRepository.getAll({
      offset: 2,
      limit: 10,
      isFavorite: true,
      search: "irrelevant",
      type: "type-1",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "GET",
        url: `${baseURL}/pokemon/?offset=2&limit=10&isFavorite=true&search=irrelevant&type=type-1`,
      })
    );
  });
});
