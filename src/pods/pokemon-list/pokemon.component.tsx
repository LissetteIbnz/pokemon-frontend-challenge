import { PokemonCard } from "common/components";
import { Gallery } from "./components";
import { Pokemon } from "./pokemon-list.vm";

interface PokemonListComponentProps {
  pokemons: Pokemon[];
  onFavoriteClick: (pokemonId: Pokemon["id"]) => void;
}

export const PokemonListComponent = ({ onFavoriteClick, pokemons }: PokemonListComponentProps) => {
  return (
    <Gallery>
      {pokemons.map(({ id, isFavorite, name, types, imageUrl }) => (
        <PokemonCard
          description={types}
          imageUrl={imageUrl}
          isFavorite={isFavorite}
          onFavorite={() => onFavoriteClick(id)}
          title={name}
          key={id}
        />
      ))}
    </Gallery>
  );
};
