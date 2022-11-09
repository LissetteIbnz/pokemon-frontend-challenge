import { ApiProvider } from "core/api";
import { RouterProvider } from "core/router";

function App() {
  return (
    <ApiProvider>
      <RouterProvider />
    </ApiProvider>
  );
}

export default App;
