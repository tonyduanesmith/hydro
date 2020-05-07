import five from "johnny-five";

import { ROWS, COLUMNS } from "../../constants.mjs";

const lcd = new five.LCD({
  controller: "PCF8574AT",
  cols: COLUMNS,
  rows: ROWS,
});

export default lcd;
