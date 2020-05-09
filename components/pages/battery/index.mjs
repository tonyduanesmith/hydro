import DataLine from "../../atoms/DataLine.mjs";

const BatteryScreen = (data) => {
    const { temperature } = data.sensorValues;
    const { battery, firmware } = data.firmwareInfo;

    const temp = `${temperature.toString()}°C`;
    const batteryString = `${battery.toString()}%`;
    const firmwareString = `${firmware.toString()}`;

    DataLine("Temp:", temp, 0);
    DataLine("Battery:", batteryString, 1);
    DataLine("Firmware:", firmwareString, 2);
};

export default BatteryScreen;
