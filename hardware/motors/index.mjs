import five from "johnny-five";

export const motor1 = new five.Motor({
  pins: {
    dir: "GPIO25",
    cdir: "GPIO8",
    pwm: "GPIO7",
  },
});

export const motor2 = new five.Motor({
  pins: {
    dir: "GPIO17",
    cdir: "GPIO27",
    pwm: "GPIO22",
  },
});

export const motor3 = new five.Motor({
  pins: {
    dir: "GPIO16",
    cdir: "GPIO20",
    pwm: "GPIO21",
  },
});

export const motor4 = new five.Motor({
  pins: {
    dir: "GPIO13",
    cdir: "GPIO19",
    pwm: "GPIO26",
  },
});
