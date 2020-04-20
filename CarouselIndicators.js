import { ROWS, COLUMNS } from "./state.js";

const CarouselIndicators = (lcd, numberOfPages, pageNumberSelected) => {
  const startRow = ROWS - 1;
  const startColumn = Math.ceil(COLUMNS / 2) - Math.ceil(numberOfPages / 2);
  let indicators = "";

  lcd.useChar("circle");
  lcd.useChar("donut");
  lcd.cursor(startRow, startColumn);

  for (let i = 1; i <= numberOfPages; i++) {
    indicators += i !== pageNumberSelected ? ":circle:" : ":donut:";
  }

  lcd.print(indicators);
};

export default CarouselIndicators;
