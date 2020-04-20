import DataLine from "../../atoms/DataLine.js";
import Text from "../../atoms/Text.js";
import lcd from "../../../hardware/lcd/index.js";
import { getData } from "../../../hardware/miflora/index.js";

const MainScreen = (devices) => {
  lcd.clear();
  Text("Fetching Data...", "center", 1);
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
      Text("                ", "center", 0);
      Text("Re-connecting...", "center", 1);
      Text("                ", "center", 2);
    }
    lcd.cursor(0, 49);
  }, 10000);
};

export default MainScreen;
