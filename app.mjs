import board from "./hardware/board/index.mjs";
import { motor1, motor2, motor3, motor4 } from "./hardware/motors/index.mjs";
import { buttonNext, buttonPrevious } from "./hardware/buttons/index.mjs";
import lcd from "./hardware/lcd/index.mjs";

import { setSensorData } from "./services/index.mjs";
import SearchingScreen from "./components/pages/searching/index.mjs";
import MainScreen from "./components/pages/main/index.mjs";
import CarouselIndicators from "./components/atoms/CarouselIndicators.mjs";
import NavigationArrows from "./components/atoms/NavigationArrows.mjs";
import BatteryScreen from "./components/pages/battery/index.mjs";
import Graph from "./components/atoms/Graph.mjs";
import { state } from "./state.mjs";
import { setSavedSensorData } from "./utils/index.mjs";

const init = async () => {
  board.on("ready", async () => {
    board.repl.inject({
      buttonPrevious,
      buttonNext,
      motor1,
      motor2,
      motor3,
      motor4,
    });
  });

  state.devices = await SearchingScreen();

  if (!state.devices.length === 2) {
    return null;
  }

  setSensorData(state.devices[0]);
  setSensorData(state.devices[1]);

  state.fetchDataInterval = setInterval(async () => {
    try {
      state.savedSensorData = setSavedSensorData(
        state.savedSensorData,
        state.sensorData,
      );

      if (state.sensorData && state.sensorData.moisture < 40) {
        motor4.start();
        motor4.forward(255);
      } else {
        motor4.stop();
      }

      if (state.sensorData && state.sensorData.fertility < 1200) {
        motor1.start();
        motor1.forward(255);
        await sleep(3000);
        motor1.stop();

        motor2.start();
        motor2.forward(255);
        await sleep(2000);
        motor2.stop();

        motor3.start();
        motor3.forward(255);
        await sleep(1000);
        motor3.stop();
      } else {
        motor1.stop();
        motor2.stop();
        motor3.stop();
      }
    } catch (e) {
      console.log(e);
      motor1.stop();
      motor2.stop();
      motor3.stop();
      motor4.stop();
      state.devices[0].disconnect();
      state.devices[1].disconnect();
    }
    //900000 for every 15 mins
  }, 90000);

  buttonPrevious.on("down", () => {
    console.log("previous");
    state.selectedPage =
      state.selectedPage + 1 > state.numberOfPages ? 1 : state.selectedPage + 1;
    clearInterval(state.renderDisplayInterval);
    render();
  });

  buttonNext.on("down", () => {
    console.log("next");
    state.selectedPage =
      state.selectedPage - 1 < 1 ? state.numberOfPages : state.selectedPage - 1;
    clearInterval(state.renderDisplayInterval);
    render();
  });

  render();
};

const render = async () => {
  const { selectedPage, numberOfPages } = state;
  if (selectedPage === 1) {
    MainScreen(state.sensorData);
  } else if (selectedPage === 2) {
    BatteryScreen(state.sensorData);
  } else if (selectedPage === 3) {
    Graph(
      "Light",
      state.savedSensorData.map((data) => data.lux),
    );
  } else if (selectedPage === 4) {
    Graph(
      "Food",
      state.savedSensorData.map((data) => data.fertility),
    );
  } else if (selectedPage === 5) {
    Graph(
      "Water",
      state.savedSensorData.map((data) => data.moisture),
    );
  } else if (selectedPage === 6) {
    Graph(
      "Temp",
      state.savedSensorData.map((data) => data.temperature),
    );
  } else if (selectedPage === 7) {
    Graph(
      "Power",
      state.savedSensorData.map((data) => data.battery),
    );
  }
  NavigationArrows();
  CarouselIndicators(numberOfPages, selectedPage);
  lcd.cursor(0, 49);

  state.renderDisplayInterval = setInterval(() => {
    if (selectedPage === 1) {
      MainScreen(state.sensorData);
      lcd.cursor(0, 49);
    } else if (selectedPage === 2) {
      BatteryScreen(state.sensorData);
      lcd.cursor(0, 49);
    } else if (selectedPage === 3) {
      Graph(
        "Light",
        state.savedSensorData.map((data) => data.lux),
      );
      lcd.cursor(0, 49);
    } else if (selectedPage === 4) {
      Graph(
        "Food",
        state.savedSensorData.map((data) => data.fertility),
      );
      lcd.cursor(0, 49);
    } else if (selectedPage === 5) {
      Graph(
        "Water",
        state.savedSensorData.map((data) => data.moisture),
      );
      lcd.cursor(0, 49);
    } else if (selectedPage === 6) {
      Graph(
        "Temp",
        state.savedSensorData.map((data) => data.temperature),
      );
      lcd.cursor(0, 49);
    } else if (selectedPage === 7) {
      Graph(
        "Power",
        state.savedSensorData.map((data) => data.battery),
      );
      lcd.cursor(0, 49);
    }
  }, 10000);
};

init();
