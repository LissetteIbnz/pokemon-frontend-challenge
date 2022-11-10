import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { pokemonsKeys } from "core/api";
import { getPokemonById, setFavorite, setUnfavorite } from "./pokemon-details.api";
import { updaterToggleFavoriteMutation } from "./pokemon-details.business";
import { PokemonDetails } from "./pokemon-details.vm";

export const usePokemonDetails = (pokemonIdURL: string) => {
  const queryClient = useQueryClient();

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery(pokemonsKeys.detail(pokemonIdURL), () => getPokemonById(pokemonIdURL));

  const { mutate: onFavorite } = useMutation(
    (pokemonId: PokemonDetails["id"]) => setFavorite(pokemonId),
    {
      onMutate: async (newPokemonId) => {
        await queryClient.cancelQueries(pokemonsKeys.detail(pokemonIdURL));

        const previousData = queryClient.getQueryData<PokemonDetails>(
          pokemonsKeys.detail(pokemonIdURL)
        );
        if (previousData) {
          queryClient.setQueryData<PokemonDetails>(
            pokemonsKeys.detail(pokemonIdURL),
            (oldPokemon) => updaterToggleFavoriteMutation(newPokemonId, oldPokemon)
          );
        }

        return previousData;
      },
      onSettled: () => {
        queryClient.invalidateQueries(pokemonsKeys.lists());
        queryClient.invalidateQueries(pokemonsKeys.detail(pokemonIdURL));
      },
    }
  );

  const { mutate: onUnfavorite } = useMutation(
    (pokemonId: PokemonDetails["id"]) => setUnfavorite(pokemonId),
    {
      onMutate: async (newPokemonId) => {
        await queryClient.cancelQueries(pokemonsKeys.detail(pokemonIdURL));

        const previousData = queryClient.getQueryData<PokemonDetails>(
          pokemonsKeys.detail(pokemonIdURL)
        );
        if (previousData) {
          queryClient.setQueryData<PokemonDetails>(
            pokemonsKeys.detail(pokemonIdURL),
            (oldPokemon) => updaterToggleFavoriteMutation(newPokemonId, oldPokemon)
          );
        }

        return previousData;
      },
      onSettled: () => {
        queryClient.invalidateQueries(pokemonsKeys.lists());
        queryClient.invalidateQueries(pokemonsKeys.detail(pokemonIdURL));
      },
    }
  );

  const handleFavoriteClick = (pokemonId: PokemonDetails["id"], isFavorite: boolean) => {
    if (isFavorite) {
      onUnfavorite(pokemonId);
    } else {
      onFavorite(pokemonId);
    }
  };

  return {
    onFavorite: handleFavoriteClick,
    pokemon,
    isError,
    isLoading,
  };
};
