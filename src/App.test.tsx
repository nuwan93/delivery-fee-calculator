import App from "./App";
import { render, screen } from "./utils/testUtils";

describe("Simple working test", () => {
  it("the title is visible", () => {
    render(<App />);
    expect(screen.getByText(/Calculate delivery price/i)).toBeInTheDocument();
  });
});
