export const ROUTES = {
  ROOT: "/",
  NOT_FOUND: "/404",
} as const;

export type Routes = typeof ROUTES;

export type TypeRoutes = typeof ROUTES[keyof typeof ROUTES];
