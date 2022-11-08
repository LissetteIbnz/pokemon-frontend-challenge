import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders pokemon api title", () => {
  render(<App />);
  const linkElement = screen.getByText(/pokemon api/i);
  expect(linkElement).toBeInTheDocument();
});
