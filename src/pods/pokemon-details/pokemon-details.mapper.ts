import { formatterList } from "common/helpers";
import { PokemonDetailsDTO } from "infra/dto";
import { PokemonDetails } from "./pokemon-details.vm";

const mapEvolutionAmToVm = (
  evolution: PokemonDetailsDTO["evolutions"][number]
): PokemonDetails["evolutions"][number] => ({
  id: evolution.id,
  imageURL: evolution.image,
  isFavorite: evolution.isFavorite,
  name: evolution.name,
});

export const mapPokemonDetailsAmToVm = (pokemon: PokemonDetailsDTO): PokemonDetails => {
  return {
    cp: pokemon.maxCP,
    evolutions: pokemon.evolutions.map(mapEvolutionAmToVm),
    height: `${pokemon.height.maximum} - ${pokemon.height.minimum}`,
    weight: `${pokemon.weight.maximum} - ${pokemon.weight.minimum}`,
    hp: pokemon.maxHP,
    id: pokemon.id,
    imageURL: pokemon.image,
    isFavorite: pokemon.isFavorite,
    name: pokemon.name,
    soundURL: pokemon.sound,
    type: formatterList(pokemon.types),
  };
};
