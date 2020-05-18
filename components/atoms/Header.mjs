import lcd from "../../hardware/lcd/index.mjs";
import { COLUMNS } from "../../constants.mjs";

const Header = (label) => {
  lcd.useChar("fullprogress");
  const isOdd = label.length % 2 !== 0;
  const blankValues = Array(Math.floor((COLUMNS - label.length) / 2))
    .fill(":fullprogress:")
    .join("");
  let header = `${blankValues}${label}${blankValues}`;
  header += isOdd ? ":fullprogress:" : "";
  lcd.cursor(0, 0).print(header);
  lcd.cursor(0, 49);
};

export default Header;
