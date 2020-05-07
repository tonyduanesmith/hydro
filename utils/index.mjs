export const getCelsius = (temp) => {
  return ((temp - 32) * 0.556).toFixed(2);
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
