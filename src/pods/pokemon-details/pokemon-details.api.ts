import { pokemonRepository } from "infra/repository";
import { mapPokemonDetailsAmToVm } from "./pokemon-details.mapper";
import { PokemonDetails } from "./pokemon-details.vm";

export const pokemonDetailsKeys = (pokemonId: string) => ["details", pokemonId] as const;

export const getPokemonById = async (pokemonIdURL: string) => {
  const response = await pokemonRepository.getById(pokemonIdURL);
  return mapPokemonDetailsAmToVm(response);
};

export const setFavorite = async (pokemonId: PokemonDetails["id"]) => {
  const response = await pokemonRepository.setFavorite(pokemonId);
  return mapPokemonDetailsAmToVm(response);
};

export const setUnfavorite = async (pokemonId: PokemonDetails["id"]) => {
  const response = await pokemonRepository.setUnfavorite(pokemonId);
  return mapPokemonDetailsAmToVm(response);
};
