const MAXIMUM_CART_VALUE_FOR_PANALTY = 10;

const getSmallOrderSurcharge = (cartValue: number) => {
  if (cartValue < MAXIMUM_CART_VALUE_FOR_PANALTY) {
    return MAXIMUM_CART_VALUE_FOR_PANALTY - cartValue;
  }
  return 0;
};

const getDeliveryDistanceFee = (deliveryDistance: number) =>
  deliveryDistance > 1000 ? 2 + Math.ceil((deliveryDistance - 1000) / 500) : 2;

const getExtraItemSurcharge = (numberOfItems: number) => {
  if (numberOfItems >= 5) {
    return 0.5 * (numberOfItems - 4);
  }
  return 0;
};

const getBulkFee = (numberOfItems: number) => {
  if (numberOfItems > 12) {
    return 1.2;
  }
  return 0;
};

const getRushHourFee = (orderTime: string) => {
  const orderDate = new Date(orderTime);
  if (
    orderDate.getUTCDay() === 5 &&
    orderDate.getUTCHours() >= 15 &&
    orderDate.getUTCHours() < 19
  ) {
    return 1.2;
  }
  return 0;
};

const getIsDeliveryFeeNotAdded = (cartValue: number) => {
  return cartValue >= 200;
};

export const getDeliveryFee = (
  cartValue: number,
  deliveryDistance: number,
  numberOfItems: number,
  orderTime: string
) => {
  const isDeliveryFeeNotAdded = getIsDeliveryFeeNotAdded(cartValue);
  if (isDeliveryFeeNotAdded) {
    return 0;
  }

  const fee =
    getSmallOrderSurcharge(cartValue) +
    getDeliveryDistanceFee(deliveryDistance) +
    getExtraItemSurcharge(numberOfItems) +
    getBulkFee(numberOfItems) +
    getRushHourFee(orderTime);
  if (fee > 15) {
    return 15;
  }
  return fee;
};
