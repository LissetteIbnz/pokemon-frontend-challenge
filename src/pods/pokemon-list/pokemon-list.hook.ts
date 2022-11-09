import * as React from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useDebounce } from "common/hooks";
import { getPaginatedPokemons, getPokemonsTypes } from "./pokemon-list.api";
import { QueryFilters } from "./pokemon-list.vm";

export const usePokemonList = () => {
  const INITIAL_OFFSET = 0;

  const [search, setSearch] = React.useState("");
  const [type, setType] = React.useState("");
  const debouncedSearch = useDebounce<string>(search, 500);

  const { isError, isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["pokemons", { search: debouncedSearch, type }],
      async ({ pageParam = INITIAL_OFFSET, queryKey }) => {
        const [_, filters] = queryKey;
        const { type, search } = filters as QueryFilters;
        const response = await getPaginatedPokemons({ offset: pageParam, search, type });
        return response;
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextOffset,
        keepPreviousData: true,
      }
    );

  const handleChangeSearch = (newSearch: string) => {
    setSearch(newSearch);
  };

  const pokemons = React.useMemo(
    () => (data ? data.pages.flatMap((page) => page.items) : []),
    [data]
  );

  return {
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
    onSearchChange: handleChangeSearch,
    onTypeChange: setType,
    pokemons,
    search,
    type,
  };
};

export const usePokemonTypes = () => {
  const { data, isLoading, isError } = useQuery(["pokemon-types"], getPokemonsTypes, {
    refetchOnReconnect: false,
  });

  const pokemonTypes = React.useMemo(() => (Array.isArray(data) ? data : []), [data]);

  return {
    pokemonTypes,
    isLoading,
    isError,
  };
};
