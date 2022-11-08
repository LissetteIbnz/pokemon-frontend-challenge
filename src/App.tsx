import { ApiProvider } from "core/api";
import { RouterProvider } from "core/router";

function App() {
  return (
    <ApiProvider>
      <header>
        <p>Pokemon API</p>
      </header>
      <RouterProvider />
    </ApiProvider>
  );
}

export default App;
