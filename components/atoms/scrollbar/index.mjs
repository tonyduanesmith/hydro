import lcd from "../../../hardware/lcd/index.mjs";

const ScrollBar = (numberOfItems, indexOfSelected) => {
  //  Load special chars
  lcd.useChar("scrollTopFull");
  lcd.useChar("scrollTopEmpty");
  lcd.useChar("scrollBottomFull");
  lcd.useChar("scrollBottomEmpty");
  lcd.useChar("fullprogress");

  if (numberOfItems === 4 && indexOfSelected === 1) {
    lcd.cursor(1, 19).print(":scrollTopFull:");
    lcd.cursor(2, 19).print(":fullprogress:");
    lcd.cursor(3, 19).print(":scrollBottomEmpty:");
  } else if (
    (numberOfItems === 4 && indexOfSelected === 2) ||
    indexOfSelected === 3
  ) {
    lcd.cursor(1, 19).print(":scrollTopEmpty:");
    lcd.cursor(2, 19).print(":fullprogress:");
    lcd.cursor(3, 19).print(":scrollBottomEmpty:");
  } else if (numberOfItems === 4 && indexOfSelected === 4) {
    lcd.cursor(1, 19).print(":scrollTopEmpty:");
    lcd.cursor(2, 19).print(":fullprogress:");
    lcd.cursor(3, 19).print(":scrollBottomFull:");
  }
  lcd.cursor(0, 49);
};

export default ScrollBar;
