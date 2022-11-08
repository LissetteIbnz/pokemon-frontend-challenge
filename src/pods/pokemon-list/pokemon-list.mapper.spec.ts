import { mockPokemonDTO } from "common/mocks";
import { mapPokemonAmToVm } from "./pokemon-list.mapper";

describe("Pokemon list mappers", () => {
  describe("mapPokemonAmToVm", () => {
    it("should map a pokemon api model to view model", () => {
      expect(mapPokemonAmToVm(mockPokemonDTO)).toMatchInlineSnapshot(`
        Object {
          "id": "irrelevant-id",
          "imageUrl": "irrelevant-image-url.png",
          "isFavorite": false,
          "name": "Irrelevant Name",
          "types": "type-1, type-2",
        }
      `);
    });
  });
});
