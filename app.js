import board from "./hardware/board/index.js";
import lcd from "./hardware/lcd/index.js";
import CarouselIndicators from "./components/atoms/CarouselIndicators.js";
import NavigationArrows from "./components/atoms/NavigationArrows.js";
import MainScreen from "./components/pages/main/index.js";
import SearchingScreen from "./components/pages/searching/index.js";
import { MIFLORA_MAC_ADDRESS } from "./constants.js";
import { sleep } from "./utils/index.js";

const init = () => {
  board.on("ready", async () => {
    const devices = await SearchingScreen();
    if (!devices.length) {
      return null;
    }

    // const devices = await getDevice("234");
    // await sleep(5000);
    // SearchingScreen(devices.length);
    // await sleep(5000);

    // const devices = await miflora.discover();
    // console.log("devices discovered: ", devices);
    // const data = await devices[0].queryFirmwareInfo();
    // console.log(data);

    const state = {
      numberOfPages: 4,
      selectedPage: 1,
    };
    if (state.selectedPage === 1) {
      MainScreen(devices);
    }
    NavigationArrows();
    CarouselIndicators(state.numberOfPages, state.selectedPage);
    lcd.cursor(0, 49);
  });
};

init();
