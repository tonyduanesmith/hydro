import DataLine from "../../atoms/DataLine.mjs";

const MainScreen = (data) => {
  if (data) {
    const { lux, fertility, moisture } = data;

    const light = `${lux.toString()}Lx`;
    const food = `${fertility.toString()}`;
    const water = `${moisture.toString()}%`;

    DataLine("Light:", light, 0);
    DataLine("Food:", food, 1);
    DataLine("Water:", water, 2);
  } else {
    DataLine("Light:", "---", 0);
    DataLine("Food:", "---", 1);
    DataLine("Water:", "---", 2);
  }
};

export default MainScreen;
