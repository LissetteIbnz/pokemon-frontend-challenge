import cx from "classnames";
import { PokemonCard } from "common/components";
import { Gallery, Header } from "./components";
import { ViewFilter, Pokemon, TypeOption, View } from "./pokemon-list.vm";
import styles from "./pokemon-list.module.scss";

interface PokemonListComponentProps {
  onFavoriteClick: (pokemonId: Pokemon["id"], isFavorite: boolean) => void;
  onPokemonClick: (pokemonId: Pokemon["id"]) => void;
  onSearchChange: (search: string) => void;
  onTypeFilterChange: (typeFilter: string) => void;
  onViewChange: (view: View) => void;
  onViewFilterChange: (viewFilter: ViewFilter) => void;
  pokemons: Pokemon[];
  search: string;
  typeFilter: string;
  typeOptions: TypeOption[];
  view: View;
  viewFilter: ViewFilter;
}

export const PokemonListComponent = ({
  onFavoriteClick,
  onPokemonClick,
  onSearchChange,
  onTypeFilterChange,
  onViewChange,
  onViewFilterChange,
  pokemons,
  search,
  typeFilter,
  typeOptions,
  view,
  viewFilter,
}: PokemonListComponentProps) => {
  const isListView = view === "list";

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
        onViewChange={onViewChange}
      />
      <Gallery view={view}>
        {pokemons.map(({ id, isFavorite, name, types, imageUrl }) => (
          <PokemonCard
            className={cx({ [styles.list]: isListView })}
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
