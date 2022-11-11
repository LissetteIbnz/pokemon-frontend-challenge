import { PokemonDetails } from "./pokemon-details.vm";

export const updaterToggleFavoriteMutation = (
  newPokemonId: string,
  oldPokemon: PokemonDetails | undefined
) => {
  const isPokemonDetails = newPokemonId === oldPokemon?.id;
  if (isPokemonDetails) {
    return oldPokemon && toggleFavorite(oldPokemon);
  } else {
    return (
      oldPokemon && {
        ...oldPokemon,
        evolutions: oldPokemon?.evolutions.map((evolution) =>
          evolution.id === newPokemonId ? toggleFavorite(evolution) : evolution
        ),
      }
    );
  }

  function toggleFavorite<Pokemon extends { isFavorite: boolean }>(pokemon: Pokemon) {
    return {
      ...pokemon,
      isFavorite: !pokemon.isFavorite,
    };
  }
};
