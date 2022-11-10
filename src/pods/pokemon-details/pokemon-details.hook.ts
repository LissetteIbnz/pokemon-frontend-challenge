import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { pokemonsKeys } from "core/api/api.keys";
import { getPokemonById, setFavorite, setUnfavorite } from "./pokemon-details.api";
import { updaterToggleFavoriteMutation } from "./pokemon-details.business";
import { PokemonDetails } from "./pokemon-details.vm";

export const usePokemonDetails = (pokemonIdURL: string) => {
  const queryClient = useQueryClient();

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery(pokemonsKeys.detailsById(pokemonIdURL), () => getPokemonById(pokemonIdURL));

  const { mutate: onFavorite } = useMutation(
    (pokemonId: PokemonDetails["id"]) => setFavorite(pokemonId),
    {
      onMutate: async (newPokemonId) => {
        await queryClient.cancelQueries(pokemonsKeys.detailsById(pokemonIdURL));

        const previousData = queryClient.getQueryData<PokemonDetails>(
          pokemonsKeys.detailsById(pokemonIdURL)
        );
        if (previousData) {
          queryClient.setQueryData<PokemonDetails>(
            pokemonsKeys.detailsById(pokemonIdURL),
            (oldPokemon) => updaterToggleFavoriteMutation(newPokemonId, oldPokemon)
          );
        }

        return previousData;
      },
      onSettled: () => {
        queryClient.invalidateQueries(pokemonsKeys.all);
        queryClient.invalidateQueries(pokemonsKeys.detailsById(pokemonIdURL));
      },
    }
  );

  const { mutate: onUnfavorite } = useMutation(
    (pokemonId: PokemonDetails["id"]) => setUnfavorite(pokemonId),
    {
      onMutate: async (newPokemonId) => {
        await queryClient.cancelQueries(pokemonsKeys.detailsById(pokemonIdURL));

        const previousData = queryClient.getQueryData<PokemonDetails>(
          pokemonsKeys.detailsById(pokemonIdURL)
        );
        if (previousData) {
          queryClient.setQueryData<PokemonDetails>(
            pokemonsKeys.detailsById(pokemonIdURL),
            (oldPokemon) => updaterToggleFavoriteMutation(newPokemonId, oldPokemon)
          );
        }

        return previousData;
      },
      onSettled: () => {
        queryClient.invalidateQueries(pokemonsKeys.all);
        queryClient.invalidateQueries(pokemonsKeys.detailsById(pokemonIdURL));
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
