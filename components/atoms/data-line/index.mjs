import lcd from "../../../hardware/lcd/index.mjs";
import { COLUMNS } from "../../../constants.mjs";

const DataLine = (label, value, row) => {
  const labelStartColumn = 2;
  const valueStartColumn = 2 + label.length;
  const spaces = Array(COLUMNS - 4 - label.length - value.length)
    .fill(" ")
    .join("");
  lcd.cursor(row, labelStartColumn).print(label);
  lcd.cursor(row, valueStartColumn).print(spaces + value);
};

export default DataLine;
