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
import { favoriteUpdater } from "./pokemon-list.business";
import {
  ViewFilter,
  QueryFilters,
  Pokemon,
  PokemonListInfiniteQueryResult,
} from "./pokemon-list.vm";

export const usePokemonList = () => {
  const INITIAL_OFFSET = 0;
  const DEBOUNCE_DELAY_MS = 500;

  const queryClient = useQueryClient();

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
        const filters = queryKey[1];
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

  const { mutate: onFavorite } = useMutation((pokemonId: Pokemon["id"]) => setFavorite(pokemonId), {
    onMutate: async (updatedPokemonId) => {
      await queryClient.cancelQueries(pokemonsKeys.list(queryFilters));

      const previousPokemons = queryClient.getQueryData(pokemonsKeys.list(queryFilters));

      const isFavorite = true;
      queryClient.setQueryData<PokemonListInfiniteQueryResult>(
        pokemonsKeys.list(queryFilters),
        (data) => favoriteUpdater(data, updatedPokemonId, isFavorite)
      );

      return { previousPokemons };
    },
  });

  const { mutate: onUnfavorite } = useMutation(
    (pokemonId: Pokemon["id"]) => setUnfavorite(pokemonId),
    {
      onMutate: async (updatedPokemonId) => {
        await queryClient.cancelQueries(pokemonsKeys.list(queryFilters));

        const previousPokemons = queryClient.getQueryData(pokemonsKeys.list(queryFilters));

        const isFavorite = false;
        queryClient.setQueryData<PokemonListInfiniteQueryResult>(
          pokemonsKeys.list(queryFilters),
          (data) => favoriteUpdater(data, updatedPokemonId, isFavorite)
        );

        return { previousPokemons };
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

  const pokemons = React.useMemo(
    () => (data ? data.pages.flatMap((page) => page.items) : []),
    [data]
  );

  return {
    fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isError,
    isFetchingNextPage,
    isLoading,
    onSearchChange: setSearch,
    onTypeFilterChange: setTypeFilter,
    onViewFilterChange: setViewFilter,
    onFavorite: handleFavoriteClick,
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
