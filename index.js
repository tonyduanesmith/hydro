import raspi from "raspi-io";
import five from "johnny-five";
import fetch from "node-fetch";

import { ROWS, COLUMNS } from "./state.js";
import CarouselIndicators from "./CarouselIndicators.js";

const board = new five.Board({
  io: new raspi.RaspiIO(),
});

const API_KEY = "";
const coords = {
  long: 53.73769,
  lat: -1.69329,
};

const fetchWeatherData = async (api, coords) => {
  const data = await fetch(
    `https://api.darksky.net/forecast/${api}/${coords.long},${coords.lat}`,
  );
  return await data.json();
};

board.on("ready", () => {
  var lcd = new five.LCD({
    controller: "PCF8574AT",
    cols: COLUMNS,
    rows: ROWS,
  });

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

  CarouselIndicators(lcd, 4, 1);
  lcd.cursor(0, 49);
});
