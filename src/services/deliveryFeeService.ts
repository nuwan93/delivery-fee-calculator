const getSmallOrderSurcharge = (cartValue: number) => {
  if (cartValue < 10) {
    return Math.round((10 - cartValue) * 100) / 100;
  }
  return 0;
};

const getDeliveryDistanceFee = (deliveryDistance: number) => {
  if (deliveryDistance > 1000) {
    return 2 + Math.ceil((deliveryDistance - 1000) / 500);
  }
  return 2;
};

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
    (orderDate.getDay() === 5 &&
      orderDate.getHours() >= 15 &&
      orderDate.getHours() < 19) ||
    (orderDate.getHours() === 19 && orderDate.getMinutes() === 0)
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
