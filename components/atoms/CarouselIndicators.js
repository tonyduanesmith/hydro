import lcd from "../../hardware/lcd/index.js";
import { ROWS, COLUMNS } from "../../constants.js";

const CarouselIndicators = (numberOfPages, selectedPage) => {
  const startRow = ROWS - 1;
  const startColumn = Math.ceil(COLUMNS / 2) - Math.ceil(numberOfPages / 2);
  let indicators = "";

  lcd.useChar("circle");
  lcd.useChar("donut");
  lcd.cursor(startRow, startColumn);

  for (let i = 1; i <= numberOfPages; i++) {
    indicators += i !== selectedPage ? ":circle:" : ":donut:";
  }

  lcd.print(indicators);
};

export default CarouselIndicators;
