import { PokemonListInfiniteQueryResult } from "./pokemon-list.vm";

export const favoriteUpdater = (
  data: PokemonListInfiniteQueryResult | undefined,
  updatedPokemonId: string,
  isFavorite: boolean
) => {
  if (data) {
    return {
      ...data,
      pages: data.pages.map((page) => {
        return {
          ...page,
          items: page.items.map((item) =>
            item.id === updatedPokemonId ? { ...item, isFavorite } : item
          ),
        };
      }),
    };
  }
};
