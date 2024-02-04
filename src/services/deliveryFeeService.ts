import { isRushHour } from "../utils/dateUtils";

export const getSmallOrderSurcharge = (cartValue: number) => {
  if (cartValue < 10) {
    return Math.round((10 - cartValue) * 100) / 100;
  }
  return 0;
};

export const getDeliveryDistanceFee = (deliveryDistance: number) => {
  if (deliveryDistance > 1000) {
    return 2 + Math.ceil((deliveryDistance - 1000) / 500);
  }
  return 2;
};

export const getExtraItemSurcharge = (numberOfItems: number) => {
  if (numberOfItems >= 5) {
    return 0.5 * (numberOfItems - 4);
  }
  return 0;
};

export const getBulkFee = (numberOfItems: number) => {
  if (numberOfItems > 12) {
    return 1.2;
  }
  return 0;
};

export const getRushHourFee = (orderTime: string) => {
  if (isRushHour(orderTime)) {
    return 1.2;
  }
  return 0;
};

export const getIsDeliveryFeeNotAdded = (cartValue: number) => {
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
