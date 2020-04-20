import miflora from "miflora";

export const getDevice = async (macAddress) => {
  const devices = await miflora.discover({
    duration: 10000,
    ignoreUnknown: true,
    addresses: [macAddress],
  });

  return devices;
};

export const getData = async (device) => {
  const data = await device.querySensorValues();
  return data;
};
