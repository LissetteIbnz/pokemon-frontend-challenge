export const routes = {
  root: "/",
  details: "/details/:id",
  detailsById: (pokemonId: string) => `/details/${pokemonId}`,
  notFound: "/404",
} as const;

export type Routes = typeof routes;
export type TypeRoutes = typeof routes[keyof typeof routes];
