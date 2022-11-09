import * as React from "react";

export const NotFoundScene = React.lazy(() =>
  import(/* webpackChunkName: "NotFoundScene" */ "./not-found.scene").then((module) => ({
    default: module.NotFoundScene,
  }))
);

export const PokemonDetailsScene = React.lazy(() =>
  import(/* webpackChunkName: "PokemonDetailsScene" */ "./pokemon-details.scene").then(
    (module) => ({
      default: module.PokemonDetailsScene,
    })
  )
);

export const PokemonListScene = React.lazy(() =>
  import(/* webpackChunkName: "PokemonListScene" */ "./pokemon-list.scene").then((module) => ({
    default: module.PokemonListScene,
  }))
);
