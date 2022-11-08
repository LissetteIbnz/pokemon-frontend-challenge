import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import { PokemonListScene, NotFoundScene } from "scenes";
import { ROUTES } from "./routes";

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <PokemonListScene />,
    errorElement: <NotFoundScene />,
  },
]);

export const RouterProvider = () => {
  return <ReactRouterProvider router={router} />;
};
