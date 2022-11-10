import { PokemonCard } from "common/components";
import { Gallery, Header } from "./components";
import { ViewFilter, Pokemon, TypeOption } from "./pokemon-list.vm";

interface PokemonListComponentProps {
  onFavoriteClick: (pokemonId: Pokemon["id"], isFavorite: boolean) => void;
  onPokemonClick: (pokemonId: Pokemon["id"]) => void;
  onSearchChange: (search: string) => void;
  onTypeFilterChange: (typeFilter: string) => void;
  onViewFilterChange: (viewFilter: ViewFilter) => void;
  pokemons: Pokemon[];
  search: string;
  typeFilter: string;
  typeOptions: TypeOption[];
  viewFilter: ViewFilter;
}

export const PokemonListComponent = ({
  onFavoriteClick,
  onPokemonClick,
  onSearchChange,
  onTypeFilterChange,
  onViewFilterChange,
  pokemons,
  search,
  typeFilter,
  typeOptions,
  viewFilter,
}: PokemonListComponentProps) => {
  return (
    <>
      <Header
        onSearchChange={onSearchChange}
        onTypeFilterChange={onTypeFilterChange}
        onViewFilterChange={onViewFilterChange}
        search={search}
        typeFilter={typeFilter}
        typeOptions={typeOptions}
        viewFilter={viewFilter}
      />
      <Gallery>
        {pokemons.map(({ id, isFavorite, name, types, imageUrl }) => (
          <PokemonCard
            types={types}
            imageUrl={imageUrl}
            isFavorite={isFavorite}
            key={id}
            onClick={() => onPokemonClick(id)}
            onFavorite={() => onFavoriteClick(id, isFavorite)}
            title={name}
          />
        ))}
      </Gallery>
    </>
  );
};
