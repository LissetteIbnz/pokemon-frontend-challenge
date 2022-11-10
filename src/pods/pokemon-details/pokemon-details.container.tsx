import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPokemonById, setFavorite, setUnfavorite } from "./pokemon-details.api";
import { PokemonDetailsComponent } from "./pokemon-details.component";
import { PokemonDetails } from "./pokemon-details.vm";

export const PokemonDetailsContainer = () => {
  const { id: pokemonIdURL } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery(["details", pokemonIdURL], () => getPokemonById(pokemonIdURL!));

  const { mutate: onFavorite } = useMutation(
    (pokemonId: PokemonDetails["id"]) => setFavorite(pokemonId),
    {
      onMutate: async (newPokemonId) => {
        await queryClient.cancelQueries(["details", pokemonIdURL]);

        const previousData = queryClient.getQueryData<PokemonDetails>(["details", pokemonIdURL]);
        if (previousData) {
          queryClient.setQueryData<PokemonDetails>(["details", pokemonIdURL], (oldPokemon) => {
            const isPokemonDetails = newPokemonId === oldPokemon?.id;
            if (isPokemonDetails) {
              return (
                oldPokemon && {
                  ...oldPokemon,
                  isFavorite: !oldPokemon.isFavorite,
                }
              );
            } else {
              return (
                oldPokemon && {
                  ...oldPokemon,
                  evolutions: oldPokemon?.evolutions.map((evolution) =>
                    evolution.id === newPokemonId
                      ? {
                          ...evolution,
                          isFavorite: !evolution.isFavorite,
                        }
                      : evolution
                  ),
                }
              );
            }
          });
        }

        return previousData;
      },
      onSettled: () => {
        queryClient.invalidateQueries(["details", pokemonIdURL]);
        queryClient.invalidateQueries(["pokemons"]);
      },
    }
  );

  const { mutate: onUnfavorite } = useMutation(
    (pokemonId: PokemonDetails["id"]) => setUnfavorite(pokemonId),
    {
      onMutate: async (newPokemonId) => {
        await queryClient.cancelQueries(["details", newPokemonId]);

        const previousData = queryClient.getQueryData<PokemonDetails>(["details", pokemonIdURL]);
        if (previousData) {
          queryClient.setQueryData<PokemonDetails>(["details", pokemonIdURL], (oldPokemon) => {
            const isPokemonDetails = newPokemonId === oldPokemon?.id;
            if (isPokemonDetails) {
              return (
                oldPokemon && {
                  ...oldPokemon,
                  isFavorite: !oldPokemon.isFavorite,
                }
              );
            } else {
              return (
                oldPokemon && {
                  ...oldPokemon,
                  evolutions: oldPokemon?.evolutions.map((evolution) =>
                    evolution.id === newPokemonId
                      ? {
                          ...evolution,
                          isFavorite: !evolution.isFavorite,
                        }
                      : evolution
                  ),
                }
              );
            }
          });
        }

        return previousData;
      },
      onSettled: () => {
        queryClient.invalidateQueries(["details", pokemonIdURL]);
        queryClient.invalidateQueries(["pokemons"]);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return <PokemonDetailsComponent pokemon={pokemon} onFavorite={handleFavoriteClick} />;
};
