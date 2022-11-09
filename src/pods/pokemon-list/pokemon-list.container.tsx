import * as React from "react";
import { useInView } from "react-intersection-observer";
import { PokemonListComponent } from "./pokemon.component";
import { usePokemonList, usePokemonTypes } from "./pokemon-list.hook";
import { Filters } from "./pokemon-list.vm";

export const PokemonListContainer = () => {
  const { ref, inView } = useInView();

  const { pokemonTypes } = usePokemonTypes();
  const {
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
    pokemons,
    onSearchChange,
    search,
    onTypeChange,
    type,
  } = usePokemonList();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const handleFilterClick = (filter: Filters) => {
    console.log(filter);
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
        onFilterClick={handleFilterClick}
        onFavoriteClick={() => undefined}
        onSearchChange={onSearchChange}
        search={search}
        pokemons={pokemons}
        typeOptions={pokemonTypes}
        onTypeSelect={onTypeChange}
        selectedType={type}
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
