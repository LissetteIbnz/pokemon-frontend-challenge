import { formatterList } from "common/helpers";
import { PokemonDTO } from "infra/dto";
import { Pokemon, TypeOption } from "./pokemon-list.vm";

export const mapPokemonAmToVm = (pokemon: PokemonDTO): Pokemon => {
  const typesList = formatterList(pokemon.types);

  return {
    id: pokemon.id,
    imageUrl: pokemon.image,
    isFavorite: pokemon.isFavorite,
    name: pokemon.name,
    types: typesList,
  };
};

export const mapPokemonTypeAmToVm = (type: string): TypeOption => {
  return {
    label: type,
    value: type,
  };
};
