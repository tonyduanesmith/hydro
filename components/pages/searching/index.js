import Text from "../../atoms/Text.js";
import lcd from "../../../hardware/lcd/index.js";
import { sleep } from "../../../utils/index.js";
import { getDevice } from "../../../hardware/miflora/index.js";
import { MIFLORA_MAC_ADDRESS } from "../../../constants.js";

const SearchingScreen = async () => {
  lcd.clear();
  Text("Searching for", "center", 1);
  Text("devices...", "center", 2);
  const devices = await getDevice(MIFLORA_MAC_ADDRESS);
  await sleep(5000);
  if (devices.length === 1) {
    lcd.clear();
    Text("Connecting...", "center", 1);
    await sleep(5000);
    return devices;
  } else {
    Text("Unable to find", "center", 1);
    Text("any devices", "center", 2);
    await sleep(5000);
    return devices;
  }
};

export default SearchingScreen;
