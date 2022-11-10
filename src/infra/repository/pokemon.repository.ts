import { buildURLSearchParams } from "common/helpers";
import { PaginateDTO, PaginateParamsDTO, PokemonDetailsDTO, PokemonDTO } from "infra/dto";
import { http } from "infra/http";

const END_POINT = "/pokemon";

const getAll = async (data?: PaginateParamsDTO) => {
  const queryParams = buildURLSearchParams(data);
  const path = `${END_POINT}/?${queryParams.toString()}`;
  const response = await http.get<PaginateDTO<PokemonDTO>>(path);
  return response;
};

const getById = async (pokemonIdURL: string) => {
  const path = `${END_POINT}/${pokemonIdURL}`;
  const response = await http.get<PokemonDetailsDTO>(path);
  return response;
};

const setFavorite = async (pokemonId: PokemonDTO["id"]) => {
  const path = `${END_POINT}/${pokemonId}/favorite`;
  const response = await http.post<PokemonDetailsDTO>({ path });
  return response;
};

const setUnfavorite = async (pokemonId: PokemonDTO["id"]) => {
  const path = `${END_POINT}/${pokemonId}/unfavorite`;
  const response = await http.post<PokemonDetailsDTO>({ path });
  return response;
};

const getTypes = async () => {
  const path = "/pokemon-types";
  return http.get<string[]>(path);
};

export const pokemonRepository = {
  getAll,
  getById,
  setFavorite,
  setUnfavorite,
  getTypes,
};
