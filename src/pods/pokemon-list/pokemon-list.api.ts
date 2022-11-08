import { pokemonRepository } from "infra/repository";
import { mapPokemonAmToVm } from "./pokemon-list.mapper";

export const getPaginatedPokemons = async (offset: number) => {
  const PAGE_SIZE = 10;

  const response = await pokemonRepository.getAll({
    limit: PAGE_SIZE,
    offset,
  });

  const totalItems = response.count;
  const nextOffset = response.offset + response.limit;

  return {
    items: response.items.map(mapPokemonAmToVm),
    nextOffset: totalItems > nextOffset ? nextOffset : undefined,
  };
};
