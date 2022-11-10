import * as React from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useDebounce } from "common/hooks";
import { pokemonsKeys } from "core/api";
import { getPaginatedPokemons, getPokemonsTypes } from "./pokemon-list.api";
import { ViewFilter, QueryFilters } from "./pokemon-list.vm";

export const usePokemonList = () => {
  const INITIAL_OFFSET = 0;
  const DEBOUNCE_DELAY_MS = 500;

  const [viewFilter, setViewFilter] = React.useState<ViewFilter>("all");
  const [typeFilter, setTypeFilter] = React.useState("");
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce<string>(search, DEBOUNCE_DELAY_MS);

  const isFavorite = viewFilter === "favorites" || undefined;
  const queryFilters: Omit<QueryFilters, "offset"> = {
    isFavorite,
    search: debouncedSearch,
    type: typeFilter,
  };

  const { isError, isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      pokemonsKeys.list(queryFilters),
      async ({ pageParam = INITIAL_OFFSET, queryKey }) => {
        const [_, filters] = queryKey;
        const { type, search, isFavorite } = filters as QueryFilters;
        const response = await getPaginatedPokemons({
          offset: pageParam,
          search,
          type,
          isFavorite,
        });
        return response;
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextOffset,
        keepPreviousData: true,
      }
    );

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
    onSearchChange: setSearch,
    onTypeFilterChange: setTypeFilter,
    onViewFilterChange: setViewFilter,
    pokemons,
    search,
    typeFilter,
    viewFilter,
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
