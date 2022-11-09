import { pokemonRepository } from "infra/repository";
import { mapPokemonAmToVm, mapPokemonTypeAmToVm } from "./pokemon-list.mapper";
import { QueryFilters } from "./pokemon-list.vm";

export const getPaginatedPokemons = async ({ offset, search, type, isFavorite }: QueryFilters) => {
  const PAGE_SIZE = 10;

  const response = await pokemonRepository.getAll({
    isFavorite,
    limit: PAGE_SIZE,
    offset,
    search,
    type,
  });

  const totalItems = response.count;
  const nextOffset = response.offset + response.limit;

  return {
    items: response.items.map(mapPokemonAmToVm),
    nextOffset: totalItems > nextOffset ? nextOffset : undefined,
  };
};

export const getPokemonsTypes = async () => {
  const response = await pokemonRepository.getTypes();
  return response.map(mapPokemonTypeAmToVm);
};
