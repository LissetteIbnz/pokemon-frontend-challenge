export const routes = {
  root: "/",
  details: "details",
  detailsById: (pokemonId: string) => `${routes.details}/${pokemonId}`,
  notFound: "/404",
} as const;

export type Routes = typeof routes;

export type TypeRoutes = typeof routes[keyof typeof routes];
