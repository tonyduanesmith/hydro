import raspi from "raspi-io";
import five from "johnny-five";
import fetch from "node-fetch";

import { ROWS, COLUMNS } from "./constants.js";
import CarouselIndicators from "./CarouselIndicators.js";
import NavigationArrows from "./NavigationArrows.js";
import DataLine from "./DataLine.js";

const board = new five.Board({
  io: new raspi.RaspiIO(),
});

board.on("ready", () => {
  var lcd = new five.LCD({
    controller: "PCF8574AT",
    cols: COLUMNS,
    rows: ROWS,
  });

  const state = {
    numberOfPages: 4,
    selectedPage: 1,
  };

  //Boxed
  // lcd.useChar("box11")
  // lcd.useChar("box3")
  // lcd.useChar("box7")
  // lcd.useChar("box10")
  // lcd.useChar("box5")
  // lcd.useChar("box13")
  // lcd.useChar("box14")
  // lcd.useChar("box12")
  // lcd.cursor(0,0).print(':box11::box3::box3::box3::box3::box3::box3::box3::box3::box3::box3::box3::box3::box3::box3::box3::box3::box3::box3::box7:');
  // lcd.cursor(1,0).print(':box10:').cursor(1,19).print(':box5:')
  // lcd.cursor(2,0).print(':box10:').cursor(2,19).print(':box5:')
  // lcd.cursor(3,0).print(':box14::box12::box12::box12::box12::box12::box12::box12::box12::box12::box12::box12::box12::box12::box12::box12::box12::box12::box12::box13:');

  // Weather
  // const weather = await fetchWeatherData(API_KEY, coords)

  // lcd.cursor(0,0).print(`${weather.currently.summary}`);
  // lcd.cursor(1,0).print(`Temp: ${tempretureConvert(weather.currently.temperature)}C`);
  // lcd.cursor(2,0).print(`UV Index: ${weather.currently.uvIndex}`);
  // lcd.cursor(3,0).print(`Precipitation: ${weather.currently.precipProbability}%`)

  //Battery
  // lcd.useChar("box1");
  // lcd.useChar("box2");
  // lcd.useChar("box3");
  // lcd.useChar("box4");
  // lcd.useChar("box5");
  // lcd.useChar("box6");
  // lcd.useChar("box7");
  // lcd.useChar("box8");

  // lcd.cursor(0, 0).print("Food");
  DataLine(lcd, "Light:", "1000lx", 0);
  DataLine(lcd, "Food:", "548", 1);
  DataLine(lcd, "Water:", "85%", 2);
  NavigationArrows(lcd);
  CarouselIndicators(lcd, state.numberOfPages, state.selectedPage);
  lcd.cursor(0, 49);
});
