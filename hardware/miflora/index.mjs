import miflora from "miflora";

export const getDevice = async (macAddress) => {
  const devices = await miflora.discover({
    duration: 10000,
    ignoreUnknown: true,
    addresses: [macAddress],
  });

  return devices;
};

export const getData = async (device, prevData) => {
  try{
    const sensorData = await device.querySensorValues();
    const firmwareData = await device.queryFirmwareInfo();
    const data = {...sensorData, ...firmwareData}
    return data;
  } catch(e) {
    console.log(e)
    return prevData
  }
};
