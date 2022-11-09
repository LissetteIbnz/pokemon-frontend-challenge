import { PokemonCard } from "common/components";
import { Gallery, Header } from "./components";
import { Filters, Pokemon, TypeOption } from "./pokemon-list.vm";

interface PokemonListComponentProps {
  onFavoriteClick: (pokemonId: Pokemon["id"]) => void;
  onFilterClick: (filter: Filters) => void;
  onSearchChange: (search: string) => void;
  onTypeSelect: (value: string) => void;
  pokemons: Pokemon[];
  search: string;
  typeOptions: TypeOption[];
  selectedType: string;
}

export const PokemonListComponent = ({
  onFavoriteClick,
  onFilterClick,
  pokemons,
  onSearchChange,
  search,
  onTypeSelect,
  selectedType,
  typeOptions,
}: PokemonListComponentProps) => {
  return (
    <>
      <Header
        onAllClick={() => onFilterClick("all")}
        onFavoritesClick={() => onFilterClick("favorites")}
        onSearchChange={onSearchChange}
        searchTerm={search}
        onTypeSelect={onTypeSelect}
        typeOptions={typeOptions}
        selectedType={selectedType}
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
