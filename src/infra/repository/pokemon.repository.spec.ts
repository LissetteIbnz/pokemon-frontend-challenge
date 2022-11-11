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

  describe("getAll", () => {
    it("should call the pokemons endpoint", async () => {
      await pokemonRepository.getAll();

      expect(fetchMock).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: `${baseURL}/pokemon/?`,
        })
      );
    });

    it("should call the pokemons endpoint with query params", async () => {
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

  describe("getById", () => {
    it("should call the pokemon by id endpoint", async () => {
      const id = "001";
      await pokemonRepository.getById(id);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: `${baseURL}/pokemon/${id}`,
        })
      );
    });
  });

  describe("setFavorite", () => {
    it("should call the pokemon favorite id endpoint", async () => {
      const id = "001";
      await pokemonRepository.setFavorite(id);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: `${baseURL}/pokemon/${id}/favorite`,
        })
      );
    });
  });

  describe("setUnfavorite", () => {
    it("should call the pokemon by id endpoint", async () => {
      const id = "001";
      await pokemonRepository.setUnfavorite(id);

      expect(fetchMock).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: `${baseURL}/pokemon/${id}/unfavorite`,
        })
      );
    });
  });

  describe("getTypes", () => {
    it("should call the pokemon types endpoint", async () => {
      await pokemonRepository.getTypes();

      expect(fetchMock).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: `${baseURL}/pokemon-types`,
        })
      );
    });
  });
});
