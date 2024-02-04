import App from "./App";
import { fireEvent, render } from "./utils/testUtils";

describe("App component", () => {
  it("should render all required elements", () => {
    const { getByRole, getByLabelText } = render(<App />);

    expect(
      getByRole("spinbutton", {
        name: /cart value \(in euros\)/i,
      }).tagName
    ).toBe("INPUT");

    expect(
      getByRole("spinbutton", {
        name: /delivery distance \(in meters\)/i,
      }).tagName
    ).toBe("INPUT");

    expect(
      getByRole("spinbutton", {
        name: /number of items/i,
      }).tagName
    ).toBe("INPUT");

    expect(getByLabelText(/time/i)).toBeInTheDocument();

    expect(
      getByRole("button", {
        name: /calculate delivery price/i,
      })
    ).toBeInTheDocument();
  });

  it("should show error message if cart value is less than or equal to 0", () => {
    const { getByLabelText, getByText } = render(<App />);

    fireEvent.change(getByLabelText(/cart value/i), { target: { value: "0" } });
    fireEvent.click(getByText(/calculate delivery price/i));

    expect(
      getByText(/❌ Cart value must be greater than 0/i)
    ).toBeInTheDocument();
  });

  it("should show error message if delivery distance is less than or equal to 0", () => {
    const { getByLabelText, getByText } = render(<App />);

    fireEvent.change(getByLabelText(/cart value/i), { target: { value: "1" } });
    fireEvent.change(getByLabelText(/delivery distance/i), {
      target: { value: "0" },
    });
    fireEvent.click(getByText(/calculate delivery price/i));

    expect(
      getByText(/❌ Delivery distance must be greater than 0/i)
    ).toBeInTheDocument();
  });

  it("should show error message if number of items is less than or equal to 0", () => {
    const { getByLabelText, getByText } = render(<App />);

    fireEvent.change(getByLabelText(/cart value/i), { target: { value: "1" } });
    fireEvent.change(getByLabelText(/delivery distance/i), {
      target: { value: "1" },
    });
    fireEvent.change(getByLabelText(/number of items/i), {
      target: { value: "0" },
    });
    fireEvent.click(getByText(/calculate delivery price/i));

    expect(
      getByText(/❌ Number of items must be greater than 0/i)
    ).toBeInTheDocument();
  });

  it("should calculate and display the dilivery fee if there is no error", () => {
    const { getByLabelText, getByText } = render(<App />);

    fireEvent.change(getByLabelText(/cart value/i), { target: { value: "1" } });
    fireEvent.change(getByLabelText(/delivery distance/i), {
      target: { value: "1" },
    });
    fireEvent.change(getByLabelText(/number of items/i), {
      target: { value: "1" },
    });
    fireEvent.change(getByLabelText(/time/i), {
      target: { value: "2024-02-04T17:11" },
    });
    fireEvent.click(getByText(/calculate delivery price/i));

    expect(getByText(/✅ Total delivery fee is 11 Euros/i)).toBeInTheDocument();
  });
});
