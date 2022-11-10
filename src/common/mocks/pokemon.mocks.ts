import { PokemonDetailsDTO, PokemonDTO } from "infra/dto";

export const mockPokemonDTO: PokemonDTO = {
  id: "irrelevant-id",
  image: "irrelevant-image-url.png",
  isFavorite: false,
  name: "Irrelevant Name",
  number: 0,
  types: ["type-1", "type-2"],
};

export const mockPokemonDetailsDTO: PokemonDetailsDTO = {
  ...mockPokemonDTO,
  evolutions: [
    {
      ...mockPokemonDTO,
    },
  ],
  height: {
    maximum: "max height",
    minimum: "min height",
  },
  maxCP: 1,
  maxHP: 2,
  previousEvolutions: [],
  sound: "irrelevant-sound-url.mp3",
  weight: {
    maximum: "max weight",
    minimum: "min weight",
  },
};
