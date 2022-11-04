import { ApiProvider } from "core/api";
import { RouterProvider } from "core/router";

function App() {
  return (
    <ApiProvider>
      <div>
        <header>
          <p>Pokemon API</p>
        </header>
        <RouterProvider />
      </div>
    </ApiProvider>
  );
}

export default App;
