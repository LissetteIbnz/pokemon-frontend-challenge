import { mockPokemonDTO } from "common/mocks";
import { favoriteUpdater } from "./pokemon-list.business";
import { mapPokemonAmToVm } from "./pokemon-list.mapper";

describe("Pokemon list business", () => {
  describe("favoriteUpdater", () => {
    it("should set isFavorite as true", () => {
      const isFavorite = true;
      const mockPokemon = mapPokemonAmToVm({ ...mockPokemonDTO, isFavorite: false });
      expect(
        favoriteUpdater(
          {
            pages: [
              {
                items: [mockPokemon],
                nextOffset: 1,
              },
            ],
          },
          mockPokemon.id,
          isFavorite
        )
      ).toEqual({
        pages: [
          {
            items: [
              {
                id: "irrelevant-id",
                imageUrl: "irrelevant-image-url.png",
                isFavorite: true,
                name: "Irrelevant Name",
                types: "type-1, type-2",
              },
            ],
            nextOffset: 1,
          },
        ],
      });
    });

    it("should set isFavorite as false", () => {
      const isFavorite = false;
      const mockPokemon = mapPokemonAmToVm({ ...mockPokemonDTO, isFavorite: true });
      expect(
        favoriteUpdater(
          {
            pages: [
              {
                items: [mockPokemon],
                nextOffset: 1,
              },
            ],
          },
          mockPokemon.id,
          isFavorite
        )
      ).toEqual({
        pages: [
          {
            items: [
              {
                id: "irrelevant-id",
                imageUrl: "irrelevant-image-url.png",
                isFavorite: false,
                name: "Irrelevant Name",
                types: "type-1, type-2",
              },
            ],
            nextOffset: 1,
          },
        ],
      });
    });
  });
});
