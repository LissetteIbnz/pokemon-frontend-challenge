import * as React from "react";
import { useInView } from "react-intersection-observer";
import { PokemonListComponent } from "./pokemon.component";
import { usePokemonList } from "./pokemon-list.hook";

export const PokemonListContainer = () => {
  const { ref, inView } = useInView();

  const { fetchNextPage, hasNextPage, isError, isFetchingNextPage, isLoading, pokemons } =
    usePokemonList();

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
      <PokemonListComponent onFavoriteClick={() => undefined} pokemons={pokemons} />

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
