import { mockPokemonDetailsDTO } from "common/mocks";
import { mapPokemonDetailsAmToVm } from "./pokemon-details.mapper";

describe("Pokemon Details mappers", () => {
  describe("mapPokemonDetailsAmToVm", () => {
    it("should map correctly", () => {
      expect(mapPokemonDetailsAmToVm(mockPokemonDetailsDTO)).toMatchInlineSnapshot(`
        Object {
          "cp": 1,
          "evolutions": Array [
            Object {
              "id": "irrelevant-id",
              "imageURL": "irrelevant-image-url.png",
              "isFavorite": false,
              "name": "Irrelevant evolution name",
            },
          ],
          "height": "max height - min height",
          "hp": 2,
          "id": "irrelevant-id",
          "imageURL": "irrelevant-image-url.png",
          "isFavorite": false,
          "name": "Irrelevant Name",
          "soundURL": "irrelevant-sound-url.mp3",
          "type": "type-1, type-2",
          "weight": "max weight - min weight",
        }
      `);
    });
  });
});
