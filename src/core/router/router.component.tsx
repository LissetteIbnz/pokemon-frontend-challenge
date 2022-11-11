import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PokemonListScene, PokemonDetailsScene, NotFoundScene } from "scenes";
import { routes } from "./routes";

export const RouterComponent = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<>...</>}>
        <Routes>
          <Route element={<PokemonListScene />} path={routes.root} />
          <Route element={<PokemonDetailsScene />} path={routes.details} />
          <Route element={<NotFoundScene />} path="*" />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};
