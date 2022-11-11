import { updaterToggleFavoriteMutation } from "./pokemon-details.business";
import { PokemonDetails } from "./pokemon-details.vm";

describe("Pokemon Details business", () => {
  describe("updaterMutationPokemonDetails", () => {
    it("should update the main pokemon when it matches", () => {
      const oldPokemon = {
        id: "001",
        isFavorite: true,
      } as PokemonDetails;
      const pokemonId = "001";
      expect(updaterToggleFavoriteMutation(pokemonId, oldPokemon)).toEqual({
        id: "001",
        isFavorite: false,
      });
    });

    it("should update an evolution pokemon when it matches", () => {
      const oldPokemon = {
        id: "001",
        isFavorite: true,
        evolutions: [
          {
            id: "002",
            isFavorite: true,
          },
          {
            id: "003",
            isFavorite: true,
          },
        ],
      } as PokemonDetails;
      const pokemonId = "002";
      expect(updaterToggleFavoriteMutation(pokemonId, oldPokemon)).toEqual({
        id: "001",
        isFavorite: true,
        evolutions: [
          {
            id: "002",
            isFavorite: false,
          },
          {
            id: "003",
            isFavorite: true,
          },
        ],
      });
    });
  });
});
