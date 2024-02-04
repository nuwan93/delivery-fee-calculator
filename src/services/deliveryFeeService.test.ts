import {
  getSmallOrderSurcharge,
  getDeliveryDistanceFee,
  getExtraItemSurcharge,
  getBulkFee,
  getRushHourFee,
  getIsDeliveryFeeNotAdded,
  getDeliveryFee,
} from "./deliveryFeeService";

describe("getSmallOrderSurcharge", () => {
  it("should return the correct surcharge for small orders", () => {
    expect(getSmallOrderSurcharge(5)).toBe(5);
    expect(getSmallOrderSurcharge(10)).toBe(0);
    expect(getSmallOrderSurcharge(11)).toBe(0);
  });
});

describe("getDeliveryDistanceFee", () => {
  it("should return the correct fee for delivery distance", () => {
    expect(getDeliveryDistanceFee(500)).toBe(2);
    expect(getDeliveryDistanceFee(1499)).toBe(3);
    expect(getDeliveryDistanceFee(1500)).toBe(3);
    expect(getDeliveryDistanceFee(1501)).toBe(4);
  });
});

describe("getExtraItemSurcharge", () => {
  it("should return the correct surcharge for extra items", () => {
    expect(getExtraItemSurcharge(4)).toBe(0);
    expect(getExtraItemSurcharge(6)).toBe(1);
    expect(getExtraItemSurcharge(10)).toBe(3);
  });
});

describe("getBulkFee", () => {
  it("should return the correct fee for bulk items", () => {
    expect(getBulkFee(10)).toBe(0);
    expect(getBulkFee(12)).toBe(0);
    expect(getBulkFee(13)).toBe(1.2);
  });
});

describe("getRushHourFee", () => {
  it("should return the correct fee for rush hour orders", () => {
    expect(getRushHourFee("2024-02-09T19:36")).toBe(0);
    expect(getRushHourFee("2024-02-02T19:00")).toBe(1.2);
    expect(getRushHourFee("2024-02-02T18:15")).toBe(1.2);
    expect(getRushHourFee("2024-01-31T19:38")).toBe(0);
  });
});

describe("getIsDeliveryFeeNotAdded", () => {
  it("should return true if delivery fee is not added", () => {
    expect(getIsDeliveryFeeNotAdded(199)).toBe(false);
    expect(getIsDeliveryFeeNotAdded(200)).toBe(true);
    expect(getIsDeliveryFeeNotAdded(201)).toBe(true);
  });
});

describe("getDeliveryFee", () => {
  it("should return the correct delivery fee", () => {
    expect(getDeliveryFee(1, 1, 1, "2024-02-09T19:36")).toBe(11);
    expect(getDeliveryFee(7.9, 2235, 4, "2024-01-15T13:36")).toBe(7.1);
  });
});
