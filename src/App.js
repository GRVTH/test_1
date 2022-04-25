import "./styles.css";

import { PricesContextProvider } from "./context/PricesContext";

import UserInput from "./components/UserInput";
import CalculatedOutput from "./components/CalculatedOutput";

export default function App() {
  return (
    <PricesContextProvider>
      <UserInput></UserInput>
      <CalculatedOutput></CalculatedOutput>
    </PricesContextProvider>
  );
}
