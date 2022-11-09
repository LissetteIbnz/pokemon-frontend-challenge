import { ApiProvider } from "core/api";
import { RouterComponent } from "core/router";

function App() {
  return (
    <ApiProvider>
      <RouterComponent />
    </ApiProvider>
  );
}

export default App;
