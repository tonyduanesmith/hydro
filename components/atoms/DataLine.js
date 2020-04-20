import lcd from "../../hardware/lcd/index.js";
import { COLUMNS } from "../../constants.js";

const DataLine = (label, value, row) => {
  const labelStartColumn = 2;
  const valueStartColumn = COLUMNS - 2 - value.length;
  lcd.cursor(row, labelStartColumn).print(label);
  lcd.cursor(row, valueStartColumn).print(value);
};

export default DataLine;
