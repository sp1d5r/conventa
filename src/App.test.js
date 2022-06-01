import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders a navbar link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Academy/i);
  expect(linkElement).toBeInTheDocument();
});
