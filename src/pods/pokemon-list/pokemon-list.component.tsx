import cx from "classnames";
import { PokemonCard } from "common/components";
import { Gallery, Header } from "./components";
import { ViewFilter, Pokemon, TypeOption, View } from "./pokemon-list.vm";
import styles from "./pokemon-list.module.scss";

export interface PokemonListComponentProps {
  fetchButton: React.ReactNode;
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
  fetchButton,
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
        search={search}
        typeFilter={typeFilter}
        typeOptions={typeOptions}
        viewFilter={viewFilter}
        onSearchChange={onSearchChange}
        onTypeFilterChange={onTypeFilterChange}
        onViewChange={onViewChange}
        onViewFilterChange={onViewFilterChange}
      />
      <Gallery view={view}>
        {pokemons.map(({ id, isFavorite, name, types, imageUrl }) => (
          <PokemonCard
            key={id}
            className={cx({ [styles.list]: isListView })}
            imageUrl={imageUrl}
            isFavorite={isFavorite}
            title={name}
            types={types}
            onClick={() => onPokemonClick(id)}
            onFavorite={() => onFavoriteClick(id, isFavorite)}
          />
        ))}
      </Gallery>
      {fetchButton}
    </>
  );
};
