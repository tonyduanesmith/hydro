import lcd from "../../hardware/lcd/index.mjs";
import { ROWS, COLUMNS } from "../../constants.mjs";

const NavigationArrows = () => {
  const startRow = Math.floor(ROWS / 2) - 1;
  const leftArrowColumn = 0;
  const rightArrowColumn = COLUMNS - 1;

  lcd.useChar("bigpointerright");
  lcd.useChar("bigpointerleft");

  lcd.cursor(startRow, leftArrowColumn).print(":bigpointerleft:");
  lcd.cursor(startRow, rightArrowColumn).print(":bigpointerright:");
};

export default NavigationArrows;
