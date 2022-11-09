import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders pokemon api title", () => {
  render(<App />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
