import * as React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPaginatedPokemons } from "./pokemon-list.api";

export const usePokemonList = () => {
  const INITIAL_OFFSET = 0;

  const { isError, isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["pokemons"],
      async ({ pageParam = INITIAL_OFFSET }) => {
        const response = await getPaginatedPokemons(pageParam);
        return response;
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextOffset,
      }
    );

  const pokemons = React.useMemo(
    () => (data ? data.pages.flatMap((page) => page.items) : []),
    [data]
  );

  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    pokemons,
  };
};
