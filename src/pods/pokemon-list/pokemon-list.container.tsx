import * as React from "react";
import { useInView } from "react-intersection-observer";
import { PokemonListComponent } from "./pokemon.component";
import { usePokemonList, usePokemonTypes } from "./pokemon-list.hook";
import { useNavigate } from "react-router-dom";
import { Pokemon } from "./pokemon-list.vm";
import { routes } from "core/router/routes";

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
    onSearchChange,
    onTypeFilterChange,
    onViewFilterChange,
    pokemons,
    search,
    typeFilter,
    viewFilter,
  } = usePokemonList();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const handleNavigateDetails = (pokemonId: Pokemon["id"]) => {
    navigate(routes.detailsById(pokemonId));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <>
      <PokemonListComponent
        onPokemonClick={handleNavigateDetails}
        onViewFilterChange={onViewFilterChange}
        onFavoriteClick={() => undefined}
        onSearchChange={onSearchChange}
        search={search}
        pokemons={pokemons}
        typeOptions={pokemonTypes}
        onTypeFilterChange={onTypeFilterChange}
        typeFilter={typeFilter}
        viewFilter={viewFilter}
      />

      <div>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load Newer"
            : "Nothing more to load"}
        </button>
      </div>
    </>
  );
};
