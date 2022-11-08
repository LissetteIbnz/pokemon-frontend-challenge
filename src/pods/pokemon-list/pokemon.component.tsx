import { PokemonCard } from "common/components";
import { Gallery, Header } from "./components";
import { Filters, Pokemon } from "./pokemon-list.vm";

interface PokemonListComponentProps {
  pokemons: Pokemon[];
  onFilterClick: (filter: Filters) => void;
  onFavoriteClick: (pokemonId: Pokemon["id"]) => void;
}

export const PokemonListComponent = ({
  onFavoriteClick,
  onFilterClick,
  pokemons,
}: PokemonListComponentProps) => {
  return (
    <>
      <Header
        onAllClick={() => onFilterClick("all")}
        onFavoritesClick={() => onFilterClick("favorites")}
      />
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
    </>
  );
};
