import * as React from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { routes } from "core/router";
import { PokemonListComponent } from "./pokemon-list.component";
import { usePokemonList, usePokemonTypes } from "./pokemon-list.hook";
import { Pokemon, View } from "./pokemon-list.vm";
import { LoadMoreButton } from "./components";

export const PokemonListContainer = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  const { pokemonTypes } = usePokemonTypes();
  const {
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
    onFavorite,
    onSearchChange,
    onTypeFilterChange,
    onViewFilterChange,
    pokemons,
    search,
    typeFilter,
    viewFilter,
  } = usePokemonList();

  const [view, setView] = React.useState<View>("grid");

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const handleNavigateDetails = (pokemonId: Pokemon["id"]) => {
    navigate(routes.detailsById(pokemonId));
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <PokemonListComponent
      fetchButton={
        <LoadMoreButton
          ref={ref}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      }
      pokemons={pokemons}
      search={search}
      typeFilter={typeFilter}
      typeOptions={pokemonTypes}
      view={view}
      viewFilter={viewFilter}
      onFavoriteClick={onFavorite}
      onPokemonClick={handleNavigateDetails}
      onSearchChange={onSearchChange}
      onTypeFilterChange={onTypeFilterChange}
      onViewChange={handleViewChange}
      onViewFilterChange={onViewFilterChange}
    />
  );
};
