import moment from "moment";

export const getCelsius = (temp) => {
  return ((temp - 32) * 0.556).toFixed(2);
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const setSavedSensorData = (currentData, newData) => {
  return [newData, ...currentData].slice(0, 10);
};

export const getDateTime = () => {
  return moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
};
