import { buildURLSearchParams } from "common/helpers";
import { PaginateDTO, PaginateParamsDTO, PokemonDTO } from "infra/dto";
import { http } from "infra/http";

const getAll = async (data?: PaginateParamsDTO) => {
  const END_POINT = "/pokemon/";
  const queryParams = buildURLSearchParams(data);
  const path = `${END_POINT}?${queryParams.toString()}`;
  const response = await http.get<PaginateDTO<PokemonDTO>>(path);
  return response;
};

const getTypes = async () => {
  const path = "/pokemon-types";
  return http.get<string[]>(path);
};

export const pokemonRepository = {
  getAll,
  getTypes,
};
