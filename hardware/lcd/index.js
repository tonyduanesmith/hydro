import five from "johnny-five";

import { ROWS, COLUMNS } from "../../constants.js";

const lcd = new five.LCD({
  controller: "PCF8574AT",
  cols: COLUMNS,
  rows: ROWS,
});

export default lcd;
