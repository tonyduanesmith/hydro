import miflora from "miflora";

import { getDateTime } from "../../utils/index.mjs";

export const getDevice = async (macAddress) => {
  try {
    const devices = await miflora.discover({
      duration: 10000,
      ignoreUnknown: true,
      addresses: [...macAddress],
    });
    return devices;
  } catch (e) {
    console.log("Cannot get devices");
    return [];
  }
};

export const getData = async (device) => {
  try {
    const data = await device.query();
    return data;
  } catch (e) {
    console.log(`[${getDateTime()}] - Cannot get sensor data`);
  }
};
