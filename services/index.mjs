import fetch from "node-fetch";
import moment from "moment";

import { getData } from "../hardware/miflora";
import { sleep, getDateTime } from "../utils";
import { state } from "../state.mjs";
import { MIFLORA_TRAY1_MAC_ADDRESS } from "../constants";

export const setSensorData = async (device) => {
  let pollInterval;
  try {
    const response = await fetch(`http://localhost:3000/settings/`);
    const settings = await response.json();
    pollInterval = settings.pollInterval;

    const miFloraData = await getData(device);

    const datetime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    const sensorLocation =
      miFloraData.address.toUpperCase() === MIFLORA_TRAY1_MAC_ADDRESS
        ? "tray1"
        : "reservoir";

    const data = {
      lux: miFloraData.sensorValues.lux,
      battery: miFloraData.firmwareInfo.battery,
      temperature: miFloraData.sensorValues.temperature,
      moisture: miFloraData.sensorValues.moisture,
      fertility: miFloraData.sensorValues.fertility,
      datetime,
    };
    if (sensorLocation === "tray1") {
      state.sensorData = data;
    }
    await fetch(`http://localhost:3000/${sensorLocation}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.log(`[${getDateTime()}] - Cannot set sensor data`);
  }
  await sleep(pollInterval);
  setSensorData(device);
};
