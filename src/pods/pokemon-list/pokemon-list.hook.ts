import * as React from "react";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "common/hooks";
import { pokemonsKeys } from "core/api";
import {
  getPaginatedPokemons,
  getPokemonsTypes,
  setFavorite,
  setUnfavorite,
} from "./pokemon-list.api";
import { ViewFilter, QueryFilters, Pokemon } from "./pokemon-list.vm";

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
  const { data, isLoading, isError } = useQuery(pokemonsKeys.types, getPokemonsTypes, {
    refetchOnReconnect: false,
  });

  const pokemonTypes = React.useMemo(() => (Array.isArray(data) ? data : []), [data]);

  return {
    pokemonTypes,
    isLoading,
    isError,
  };
};

export const useFavorite = () => {
  const queryClient = useQueryClient();

  const { mutate: onFavorite } = useMutation((pokemonId: Pokemon["id"]) => setFavorite(pokemonId), {
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  const { mutate: onUnfavorite } = useMutation(
    (pokemonId: Pokemon["id"]) => setUnfavorite(pokemonId),
    {
      onSettled: () => {
        queryClient.invalidateQueries();
      },
    }
  );

  const handleFavoriteClick = (pokemonId: Pokemon["id"], isFavorite: boolean) => {
    if (isFavorite) {
      onUnfavorite(pokemonId);
    } else {
      onFavorite(pokemonId);
    }
  };

  return {
    onFavorite: handleFavoriteClick,
  };
};
