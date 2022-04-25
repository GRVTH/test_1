import { useContext, useEffect } from "react";
import PricesContext from "./../context/PricesContext";

/**
 * component for viewing generated Context data
 */
const CalculatedOutput = () => {
  const pricesCtx = useContext(PricesContext);

  useEffect(() => {
    pricesCtx.calculateProfit();
  });

  /**
   * reusable constant for showing most important Context Data
   */
  const dataHead = (
    <div>
      <h4>Days: {pricesCtx.prices.length}</h4>
      <h4>Prices: {pricesCtx.prices.toString()}</h4>
    </div>
  );

  if (pricesCtx.prices.length > 0) {
    //if there are generated prices in Context data
    if (pricesCtx.maxProfit === 0) {
      //if there is NO possibility of profit
      return (
        <div>
          {dataHead}
          <h4>Profit is not Possible</h4>
        </div>
      );
    } else {
      //show maximum possible profit, and how to achieve it
      return (
        <div>
          {dataHead}
          <h4>Maximum profit: {pricesCtx.maxProfit}</h4>
          <h4>Buy on day number {pricesCtx.bestDayToBuy}</h4>
          <h4>Sell on Day number {pricesCtx.bestDayToSell}</h4>
        </div>
      );
    }
  } else {
    //if there are NOT generated prices in Context data
    return (
      <div>
        <h5>Waiting for input</h5>
      </div>
    );
  }
};

export default CalculatedOutput;
