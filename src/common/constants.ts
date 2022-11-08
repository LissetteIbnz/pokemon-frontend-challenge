export const queryKeys = {
  all: ["pokemons"] as const,
  details: () => [...queryKeys.all, "detail"] as const,
  detail: (id: number) => [...queryKeys.details(), id] as const,
};
