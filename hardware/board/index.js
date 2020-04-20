import raspi from "raspi-io";
import five from "johnny-five";

const board = new five.Board({
  io: new raspi.RaspiIO(),
});

export default board;
