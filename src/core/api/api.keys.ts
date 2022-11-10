export const pokemonsKeys = {
  all: ["pokemons"] as const,
  filters: (filters: string) => [pokemonsKeys.all, ...filters] as const,
  details: ["details"] as const,
  detailsById: (pokemonId: string) => [pokemonsKeys.details, pokemonId] as const,
};
