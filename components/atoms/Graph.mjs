import lcd from "../../hardware/lcd/index.mjs";
import { COLUMNS, ROWS } from "../../constants.mjs";

const Graph = (label, data) => {
    const startColumn = 2;
    const labelStartColumn = 2 + label.length;
    const startGraph = COLUMNS - 2 - 10;
    const spaces = Array(COLUMNS - 4).fill(" ").join("");
    const labelSpaces = Array(COLUMNS - 4 - label.length).fill(" ").join("");

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    const segmant = Math.floor(range / 12)

    const minLabel = min.toString();
    const maxLabel = max.toString();
    const minLabelStartColumn = 2 + minLabel.length;
    const maxLabelStartColumn = 2 + maxLabel.length;
    const minLabelSpaces = Array(COLUMNS - 4 - minLabel.length).fill(" ").join("");
    const maxLabelSpaces = Array(COLUMNS - 4 - maxLabel.length).fill(" ").join("");

    lcd.useChar("descchart2");
    lcd.useChar("descchart4");
    lcd.useChar("descchart6");
    lcd.useChar("fullprogress");

    lcd.cursor(0, startColumn).print(label);
    lcd.cursor(0, labelStartColumn).print(labelSpaces);
    lcd.cursor(1, startColumn).print(maxLabel);
    lcd.cursor(1, maxLabelStartColumn).print(maxLabelSpaces);
    lcd.cursor(2, startColumn).print(minLabel);
    lcd.cursor(2, minLabelStartColumn).print(minLabelSpaces);

    data.forEach((value, index) => {
        if(value === min){
            lcd.cursor(2, startGraph + index).print(":descchart2:");
        } else if(value === max){
            lcd.cursor(0, startGraph + index).print(":fullprogress:");
            lcd.cursor(1, startGraph + index).print(":fullprogress:");
            lcd.cursor(2, startGraph + index).print(":fullprogress:");
        } else {
            const newRange = value - min;
            const segmantCount = Math.floor(newRange / segmant);
            const fullSegmantCount = Math.floor(segmantCount / 4);
            const lastSegmant = Math.floor(segmantCount % 4);
            
            if(fullSegmantCount === 0){
                lcd.cursor(2, startGraph + index).print(":descchart2:");
            } else if(fullSegmantCount === 1){
                if(lastSegmant === 1 ){
                    lcd.cursor(1, startGraph + index).print(":descchart2:");
                } else if(lastSegmant === 2){
                    lcd.cursor(1, startGraph + index).print(":descchart4:");
                } else if(lastSegmant === 3){
                    lcd.cursor(1, startGraph + index).print(":descchart6:");
                }
                lcd.cursor(2, startGraph + index).print(":fullprogress:");
            } else if(fullSegmantCount === 2){
                if(lastSegmant === 1 ){
                    lcd.cursor(0, startGraph + index).print(":descchart2:");
                } else if(lastSegmant === 2){
                    lcd.cursor(0, startGraph + index).print(":descchart4:");
                } else if(lastSegmant === 3){
                    lcd.cursor(0, startGraph + index).print(":descchart6:");
                }
                lcd.cursor(1, startGraph + index).print(":fullprogress:");
                lcd.cursor(2, startGraph + index).print(":fullprogress:");
            } else {
                lcd.cursor(0, startGraph + index).print(":fullprogress:");
                lcd.cursor(1, startGraph + index).print(":fullprogress:");
                lcd.cursor(2, startGraph + index).print(":fullprogress:");
            }
        }
    })
}

export default Graph;