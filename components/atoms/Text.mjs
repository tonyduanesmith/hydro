import lcd from "../../hardware/lcd/index.mjs";
import { COLUMNS } from "../../constants.mjs";

const Text = (value, align, row) => {
  if (align === "left") {
    lcd.cursor(row, 0).print(value);
  } else if (align === "right") {
    const startColumn = COLUMNS - value.length;
    lcd.cursor(row, startColumn).print(value);
  } else if (align === "center") {
    const startColumn = Math.ceil(COLUMNS / 2) - Math.ceil(value.length / 2);
    lcd.cursor(row, startColumn).print(value);
  } else {
    lcd.print(value);
  }
  lcd.cursor(0, 49);
};

export default Text;
