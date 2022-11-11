import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("renders pokemons page", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
