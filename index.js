import board from "./hardware/board/index.js";
import lcd from "./hardware/lcd/index.js";

import CarouselIndicators from "./components/atoms/CarouselIndicators.js";
import NavigationArrows from "./components/atoms/NavigationArrows.js";
import MainScreen from "./components/pages/main/index.js";

board.on("ready", () => {
  const state = {
    numberOfPages: 4,
    selectedPage: 1,
  };

  MainScreen();
  NavigationArrows();
  CarouselIndicators(state.numberOfPages, state.selectedPage);
  lcd.cursor(0, 49);
});
