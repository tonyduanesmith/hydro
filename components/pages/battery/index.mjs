import DataLine from "../../atoms/DataLine.mjs";
import Text from "../../atoms/Text.mjs";
import lcd from "../../../hardware/lcd/index.mjs";
import { getData } from "../../../hardware/miflora/index.mjs";

const BatteryScreen = (devices, prevData) => {
  lcd.clear();
  DataLine("Temp:", "0Lx", 0);
  DataLine("Battery:", "0", 1);
  DataLine("Firmware:", "0%", 2);
  setInterval(async () => {
    try {
      const data = await getData(devices[0]);
      const { temperature } = data.sensorValues;
      const { battery, firmware } = data.firmwareInfo;

      const temp = `${temperature.toString()}°C`;
      const batteryString = `${battery.toString()}%`;
      const firmwareString = `${firmware.toString()}`;

      DataLine("Temp:", temp, 0);
      DataLine("Battery:", batteryString, 1);
      DataLine("Firmware:", firmwareString, 2);
    } catch (e) {
        console.log(e)
      Text("                ", "center", 0);
      Text("Re-connecting...", "center", 1);
      Text("                ", "center", 2);
    }
    lcd.cursor(0, 49);
  }, 10000);
};

export default BatteryScreen;
