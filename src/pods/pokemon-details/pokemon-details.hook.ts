import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import {
  getPokemonById,
  setFavorite,
  setUnfavorite,
  pokemonDetailsKeys,
} from "./pokemon-details.api";
import { updaterToggleFavoriteMutation } from "./pokemon-details.business";
import { PokemonDetails } from "./pokemon-details.vm";

export const usePokemonDetails = (pokemonIdURL: string) => {
  const queryClient = useQueryClient();

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery(pokemonDetailsKeys(pokemonIdURL), () => getPokemonById(pokemonIdURL));

  const { mutate: onFavorite } = useMutation(
    (pokemonId: PokemonDetails["id"]) => setFavorite(pokemonId),
    {
      onMutate: async (newPokemonId) => {
        await queryClient.cancelQueries(pokemonDetailsKeys(pokemonIdURL));

        const previousData = queryClient.getQueryData<PokemonDetails>(
          pokemonDetailsKeys(pokemonIdURL)
        );
        if (previousData) {
          queryClient.setQueryData<PokemonDetails>(pokemonDetailsKeys(pokemonIdURL), (oldPokemon) =>
            updaterToggleFavoriteMutation(newPokemonId, oldPokemon)
          );
        }

        return previousData;
      },
      onSettled: () => {
        queryClient.invalidateQueries(pokemonDetailsKeys(pokemonIdURL));
      },
    }
  );

  const { mutate: onUnfavorite } = useMutation(
    (pokemonId: PokemonDetails["id"]) => setUnfavorite(pokemonId),
    {
      onMutate: async (newPokemonId) => {
        await queryClient.cancelQueries(pokemonDetailsKeys(pokemonIdURL));

        const previousData = queryClient.getQueryData<PokemonDetails>(
          pokemonDetailsKeys(pokemonIdURL)
        );
        if (previousData) {
          queryClient.setQueryData<PokemonDetails>(pokemonDetailsKeys(pokemonIdURL), (oldPokemon) =>
            updaterToggleFavoriteMutation(newPokemonId, oldPokemon)
          );
        }

        return previousData;
      },
      onSettled: () => {
        queryClient.invalidateQueries(pokemonDetailsKeys(pokemonIdURL));
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
