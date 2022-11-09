import * as React from "react";
import { useInView } from "react-intersection-observer";
import { PokemonListComponent } from "./pokemon.component";
import { usePokemonList, usePokemonTypes } from "./pokemon-list.hook";

export const PokemonListContainer = () => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <>
      <PokemonListComponent
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
