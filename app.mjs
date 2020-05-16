import five from "johnny-five";

import board from "./hardware/board/index.mjs";
import lcd from "./hardware/lcd/index.mjs";
import CarouselIndicators from "./components/atoms/CarouselIndicators.mjs";
import NavigationArrows from "./components/atoms/NavigationArrows.mjs";
import MainScreen from "./components/pages/main/index.mjs";
import BatteryScreen from "./components/pages/battery/index.mjs";
import Graph from "./components/atoms/Graph.mjs";
import SearchingScreen from "./components/pages/searching/index.mjs";
import { sleep, setSavedSensorData } from './utils/index.mjs'
import { getData } from './hardware/miflora/index.mjs'

const state = {
  numberOfPages: 7,
  selectedPage: 1,
  fetchDataInterval: null,
  renderDisplayInterval: null,
  sensorData: null,
  devices: [],
  savedSensorData: []
};

const init = () => {
  board.on("ready", async () => {

    const buttonPrevious = new five.Button("GPIO6");
    const buttonNext = new five.Button("GPIO5");
    const motor1 = new five.Motor({
      pins: {
        dir: "GPIO25",
        cdir: "GPIO8",
        pwm: "GPIO7",
      }
    })

    const motor2 = new five.Motor({
      pins: {
        dir: "GPIO17",
        cdir: "GPIO27",
        pwm: "GPIO22",
      }
    })

    const motor3 = new five.Motor({
      pins: {
        dir: "GPIO16",
        cdir: "GPIO20",
        pwm: "GPIO21",
      }
    })

    const motor4 = new five.Motor({
      pins: {
        dir: "GPIO13",
        cdir: "GPIO19",
        pwm: "GPIO26",
      }
    })

    board.repl.inject({
      buttonPrevious,
      buttonNext,
      motor1,
      motor2,
      motor3,
      motor4,
    });

    // 6ml of liquid

    // motor1.start()
    // motor1.forward(255)
    // await sleep(10000)
    // motor1.stop()
    
    // motor2.start()
    // motor2.forward(255)
    // await sleep(10000)
    // motor2.stop()

    // motor3.start()
    // motor3.forward(255)
    // await sleep(10000)
    // motor3.stop()

    // motor4.start()
    // motor4.forward(255)
    // await sleep(10000)
    // motor4.stop()


    state.devices = await SearchingScreen();

    if (!state.devices.length) {
      return null;
    }

    state.fetchDataInterval = setInterval(async () => {
      try {
        state.sensorData = await getData(state.devices[0], state.sensorData);
        state.savedSensorData = setSavedSensorData(state.savedSensorData, state.sensorData)

        if(state.sensorData && state.sensorData.sensorValues && state.sensorData.sensorValues.moisture < 40){
          motor4.start()
          motor4.forward(255)
        } else {
          motor4.stop()
        }

        if(state.sensorData && state.sensorData.sensorValues && state.sensorData.sensorValues.fertility < 1200) {
          motor1.start()
          motor1.forward(255)
          await sleep(3000)
          motor1.stop()
          
          motor2.start()
          motor2.forward(255)
          await sleep(2000)
          motor2.stop()

          motor3.start()
          motor3.forward(255)
          await sleep(1000)
          motor3.stop()

        } else {
          motor1.stop()
          motor2.stop()
          motor3.stop()
        }
      } catch(e){
        console.log(e)
          motor1.stop()
          motor2.stop()
          motor3.stop()
          motor4.stop()
          state.devices[0].disconnect()
      }
      //900000 for every 15 mins
    },90000)

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
  } else if (selectedPage === 3) {
    Graph("Light",state.savedSensorData.map(data => data.sensorValues.lux))
  } else if (selectedPage === 4) {
    Graph("Food",state.savedSensorData.map(data => data.sensorValues.fertility))
  } else if (selectedPage === 5) {
    Graph("Water",state.savedSensorData.map(data => data.sensorValues.moisture))
  } else if (selectedPage === 6) {
    Graph("Temp",state.savedSensorData.map(data => data.sensorValues.temperature))
  } else if (selectedPage === 7) {
    Graph("Power",state.savedSensorData.map(data => data.firmwareInfo.battery))
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
      Graph("Light",state.savedSensorData.map(data => data.sensorValues.lux))
      lcd.cursor(0,49);
    } else if (selectedPage === 4) {
      Graph("Food",state.savedSensorData.map(data => data.sensorValues.fertility))
      lcd.cursor(0,49);
    } else if (selectedPage === 5) {
      Graph("Water",state.savedSensorData.map(data => data.sensorValues.moisture))
      lcd.cursor(0,49);
    } else if (selectedPage === 6) {
      Graph("Temp",state.savedSensorData.map(data => data.sensorValues.temperature))
      lcd.cursor(0,49);
    } else if (selectedPage === 7) {
      Graph("Power",state.savedSensorData.map(data => data.firmwareInfo.battery))
      lcd.cursor(0,49);
    }
  }, 10000);
}

init();
