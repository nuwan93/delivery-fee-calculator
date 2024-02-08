export const getCurrentTime = (): string => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, -8);
};

const isFriday = (orderDate: Date): boolean => {
  return orderDate.getDay() === 5;
};

const isAfterFifteen = (orderDate: Date): boolean => {
  return orderDate.getHours() >= 15;
};

const isBeforeNineteen = (orderDate: Date): boolean => {
  return (
    orderDate.getHours() < 19 ||
    (orderDate.getHours() === 19 && orderDate.getMinutes() === 0)
  );
};

export const isRushHour = (orderTime: string): boolean => {
  const orderDate = new Date(orderTime);

  return (
    isFriday(orderDate) &&
    isAfterFifteen(orderDate) &&
    isBeforeNineteen(orderDate)
  );
};
