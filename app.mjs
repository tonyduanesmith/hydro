import five from "johnny-five";

import board from "./hardware/board/index.mjs";
import lcd from "./hardware/lcd/index.mjs";
import CarouselIndicators from "./components/atoms/CarouselIndicators.mjs";
import NavigationArrows from "./components/atoms/NavigationArrows.mjs";
import MainScreen from "./components/pages/main/index.mjs";
import BatteryScreen from "./components/pages/battery/index.mjs";
import SearchingScreen from "./components/pages/searching/index.mjs";
import { sleep } from './utils/index.mjs'
import { getData } from './hardware/miflora/index.mjs'

const state = {
  numberOfPages: 2,
  selectedPage: 1,
  fetchDataInterval: null,
  renderDisplayInterval: null,
  sensorData: null,
  devices: []
};

const init = () => {
  board.on("ready", async () => {

    const buttonPrevious = new five.Button("GPIO5");
    const buttonNext = new five.Button("GPIO6");
    const motor = new five.Motor({
      pins: {
        pwm: "GPIO22",
        dir: "GPIO17",
        cdir: "GPIO27"
      }
    })

    board.repl.inject({
      buttonPrevious,
      buttonNext,
      motor
    });

    // 6ml of liquid
    motor.start()
    motor.forward(255)
    await sleep(50000)
    motor.stop()



    state.devices = await SearchingScreen();

    if (!state.devices.length) {
      return null;
    }

    state.fetchDataInterval = setInterval(async () => {
      state.sensorData = await getData(state.devices[0], state.sensorData);
    },10000)

    buttonPrevious.on("down", () => {
      console.log("previous");
      state.selectedPage = (state.selectedPage + 1 > state.numberOfPages) ? 1 : state.selectedPage + 1;
      clearInterval(state.renderDisplayInterval);
      render()
    });

    buttonNext.on("down", () => {
      console.log("next");
      state.selectedPage = (state.selectedPage - 1 < 1) ? state.numberOfPages : state.selectedPage - 1;
      clearInterval(state.renderDisplayInterval);
      render()
    });

    render()
  });
};

const render = async () => {
  const { selectedPage, numberOfPages } = state
  if (selectedPage === 1) {
    MainScreen(state.sensorData);
  } else if (selectedPage === 2) {
    BatteryScreen(state.sensorData);
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
    }
  }, 10000);
}

init();
