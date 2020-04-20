import DataLine from "../../atoms/DataLine.js";

const MainScreen = () => {
  DataLine("Light:", "1000lx", 0);
  DataLine("Food:", "548", 1);
  DataLine("Water:", "85%", 2);
};

export default MainScreen;
