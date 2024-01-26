import { useState } from "react";
import InputField from "./components/InputField";
import { getDeliveryFee } from "./services/delivery-fee-service";
import { getCurrentTime } from "./utils/date-utils";

function App() {
  const [inputs, setInputs] = useState({
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
    orderTime: getCurrentTime(),
  });
  const [deliveryFee, setDeliveryFee] = useState(0);

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleOnFocus = (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    event.target.select();
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { cartValue, deliveryDistance, numberOfItems, orderTime } = inputs;
    const fee = getDeliveryFee(
      cartValue,
      deliveryDistance,
      numberOfItems,
      orderTime
    );
    setDeliveryFee(fee);
  };

  console.log(inputs);

  return (
    <div className="max-w-lg p-4 mx-auto bg-slate-200 mt-40 rounded-lg">
      <h1 className="text-3xl font-semibold text-center my-7">
        Delivery Fee Calculator
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
        <InputField
          name="cartValue"
          label="Cart Value (€)"
          type="number"
          value={inputs.cartValue}
          testId="cartValue"
          onFocus={handleOnFocus}
          onChange={handleOnchange}
        />
        <InputField
          name="deliveryDistance"
          label="Delivery Distance (m)"
          type="number"
          value={inputs.deliveryDistance}
          testId="cartValue"
          onFocus={handleOnFocus}
          onChange={handleOnchange}
        />
        <InputField
          name="numberOfItems"
          label="Number of Items"
          type="number"
          value={inputs.numberOfItems}
          testId="cartValue"
          onFocus={handleOnFocus}
          onChange={handleOnchange}
        />
        <InputField
          name="orderTime"
          label="Time"
          type="datetime-local"
          value={inputs.orderTime}
          testId="cartValue"
          onChange={handleOnchange}
        />
        <p className="p-3 text-xl text-center font-semibold">
          Delivery price: {deliveryFee}€{" "}
        </p>
        <button className="bg-slate-700 p-3 text-white rounded-lg hover:opacity-95 disabled:opacity-80 text-xl">
          Calculate delivery price
        </button>
      </form>
    </div>
  );
}

export default App;
