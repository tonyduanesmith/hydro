import DataLine from "../../atoms/DataLine.mjs";
import Text from "../../atoms/Text.mjs";
import lcd from "../../../hardware/lcd/index.mjs";
import { getData } from "../../../hardware/miflora/index.mjs";

const MainScreen = (devices, prevData) => {
  lcd.clear();
  DataLine("Light:", "0Lx", 0);
  DataLine("Food:", "0", 1);
  DataLine("Water:", "0%", 2);
  setInterval(async () => {
    try {
      const data = await getData(devices[0]);
      const { lux, fertility, moisture } = data.sensorValues;

      const light = `${lux.toString()}Lx`;
      const food = `${fertility.toString()}`;
      const water = `${moisture.toString()}%`;

      DataLine("Light:", light, 0);
      DataLine("Food:", food, 1);
      DataLine("Water:", water, 2);
    } catch (e) {
      console.log(e)
      Text("                ", "center", 0);
      Text("Re-connecting...", "center", 1);
      Text("                ", "center", 2);
    }
    lcd.cursor(0, 49);
  }, 10000);
};

export default MainScreen;
