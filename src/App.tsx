import { ApiProvider } from "core/api";
import { RouterComponent } from "core/router";

const App = () => {
  return (
    <ApiProvider>
      <RouterComponent />
    </ApiProvider>
  );
};

export default App;
