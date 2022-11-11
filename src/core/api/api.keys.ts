type Filters = Record<string, string | number | boolean>;

export const pokemonsKeys = {
  all: ["pokemons"] as const,
  lists: () => [...pokemonsKeys.all, "list"] as const,
  list: (filters: Filters) => [...pokemonsKeys.all, { ...filters }] as const,
  details: () => [...pokemonsKeys.all, "detail"] as const,
  detail: (pokemonId: string) => [...pokemonsKeys.details(), pokemonId] as const,
  types: ["pokemon-types"] as const,
};
