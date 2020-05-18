import DataLine from "../../atoms/DataLine.mjs";

const BatteryScreen = (data) => {
  const { battery, temperature } = data;

  const temp = `${temperature.toString()}°C`;
  const batteryString = `${battery.toString()}%`;
  const firmwareString = "v1.2.0";

  DataLine("Temp:", temp, 0);
  DataLine("Battery:", batteryString, 1);
  DataLine("Firmware:", firmwareString, 2);
};

export default BatteryScreen;
