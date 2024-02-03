import { useState } from "react";
import InputField from "./components/InputField";
import { getDeliveryFee } from "./services/deliveryFeeService";
import { getCurrentTime } from "./utils/dateUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
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
    setDeliveryFee(0);

    if (inputs.cartValue <= 0) {
      toast("❌ Cart value must be greater than 0");
      return;
    } else if (inputs.deliveryDistance <= 0) {
      toast("❌ Delivery distance must be greater than 0");
      return;
    } else if (inputs.numberOfItems <= 0) {
      toast("❌ Number of items must be greater than 0");
      return;
    } else {
      const { cartValue, deliveryDistance, numberOfItems, orderTime } = inputs;
      const fee = getDeliveryFee(
        cartValue,
        deliveryDistance,
        numberOfItems,
        orderTime
      );
      toast(`✅ Total delivery fee is ${fee} Euros`);
      setDeliveryFee(fee);
    }
  };

  return (
    <main className="max-w-lg p-5 mx-auto my-auto bg-white mt-40 rounded-lg">
      <h1 className="text-3xl font-semibold text-center my-5">
        Delivery Fee Calculator
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
        <InputField
          id="cartValue"
          name="cartValue"
          label="Cart Value (in Euros)"
          type="number"
          value={inputs.cartValue}
          testId="cartValue"
          onFocus={handleOnFocus}
          onChange={handleOnchange}
        />
        <InputField
          id="deliveryDistance"
          name="deliveryDistance"
          label="Delivery Distance (in meters)"
          type="number"
          value={inputs.deliveryDistance}
          testId="deliveryDistance"
          onFocus={handleOnFocus}
          onChange={handleOnchange}
        />
        <InputField
          id="numberOfItems"
          name="numberOfItems"
          label="Number of Items"
          type="number"
          value={inputs.numberOfItems}
          testId="numberOfItems"
          onFocus={handleOnFocus}
          onChange={handleOnchange}
        />
        <InputField
          id="orderTime"
          name="orderTime"
          label="Time"
          type="datetime-local"
          value={inputs.orderTime}
          testId="orderTime"
          onChange={handleOnchange}
        />
        <p
          className="p-3 text-2xl text-center font-semibold"
          data-test-id="fee"
        >
          Delivery price: {deliveryFee.toFixed(2)} €
        </p>
        <button className="bg-slate-700 p-3 text-white rounded-lg hover:opacity-95  text-xl ">
          Calculate delivery price
        </button>
      </form>
      <ToastContainer position="top-center" />
    </main>
  );
};

export default App;
