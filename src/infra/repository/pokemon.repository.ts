import { PaginateDTO, PaginateParamsDTO, PokemonDTO } from "infra/dto";
import { http } from "infra/http";

const END_POINT = "/pokemon/";

const getAll = async (data?: PaginateParamsDTO) => {
  const queryParams = new URLSearchParams();
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      queryParams.append(key, value.toString());
    });
  }
  const path = `${END_POINT}?${queryParams.toString()}`;
  const response = await http.get<PaginateDTO<PokemonDTO>>(path);
  return response;
};

export const pokemonRepository = {
  getAll,
};
