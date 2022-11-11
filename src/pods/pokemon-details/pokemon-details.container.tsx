import { routes } from "core/router/routes";
import { useNavigate, useParams } from "react-router-dom";
import { PokemonDetailsComponent } from "./pokemon-details.component";
import { usePokemonDetails } from "./pokemon-details.hook";
import { PokemonDetails } from "./pokemon-details.vm";

export const PokemonDetailsContainer = () => {
  const { id: pokemonIdURL } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { isError, isLoading, onFavorite, pokemon } = usePokemonDetails(pokemonIdURL!);

  const handleNavigateToPokemon = (pokemonId: PokemonDetails["id"]) => {
    navigate(routes.detailsById(pokemonId));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <PokemonDetailsComponent
      pokemon={pokemon!}
      onFavorite={onFavorite}
      onGoBack={handleGoBack}
      onNavigateToPokemon={handleNavigateToPokemon}
    />
  );
};
