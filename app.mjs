import five from "johnny-five";

import board from "./hardware/board/index.mjs";
import lcd from "./hardware/lcd/index.mjs";
import CarouselIndicators from "./components/atoms/CarouselIndicators.mjs";
import NavigationArrows from "./components/atoms/NavigationArrows.mjs";
import MainScreen from "./components/pages/main/index.mjs";
import BatteryScreen from "./components/pages/battery/index.mjs";
import SearchingScreen from "./components/pages/searching/index.mjs";
import { sleep } from './utils/index.mjs'

const init = () => {
  board.on("ready", async () => {
    const state = {
      numberOfPages: 2,
      selectedPage: 1,
    };

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



    const devices = await SearchingScreen();
    if (!devices.length) {
      return null;
    }

    buttonPrevious.on("down", () => {
      console.log("previous");
      state.selectedPage = (state.selectedPage + 1 > state.numberOfPages) ? 1 : state.selectedPage + 1;
      render(devices, state)
    });

    buttonNext.on("down", () => {
      console.log("next");
      state.selectedPage = (state.selectedPage - 1 < 1) ? state.numberOfPages : state.selectedPage - 1;
      render(devices, state)
    });

    render(devices, state)
  });
};

const render = (devices, state) => {
    if(state.selectedPage === 1) {
      MainScreen(devices)
    } else if( state.selectedPage === 2){
      BatteryScreen(devices)
    }
    NavigationArrows()
    CarouselIndicators(state.numberOfPages, state.selectedPage)
    lcd.cursor(0, 49)
}

init();
