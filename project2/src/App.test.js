import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders edtech app title", () => {
  render(<App />);
  const titleElement = screen.getByText(/codemaster/i);
  expect(titleElement).toBeInTheDocument();
});
