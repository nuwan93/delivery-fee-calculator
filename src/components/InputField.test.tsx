import { render, screen } from "../utils/testUtils";
import InputField from "./InputField";

describe("Input", async () => {
  it("should render the input", () => {
    render(
      <InputField
        id="cartValue"
        name="cartValue"
        label="Cart Value (in Euros)"
        type="number"
        testId="cartValue"
      />
    );
    expect(screen.getByText("Cart Value (in Euros)")).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", {
        name: /cart value \(in euros\)/i,
      })
    ).toBeInTheDocument();
  });
});
