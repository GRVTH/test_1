import { createContext, useState } from "react";

/**
 *  context for stock prices
 * @prices - array of stock prices for each day
 * @maxProfit - maximum possible profit for current @prices array
 * @bestDayToBuy - index of day from @prices which has biggest possible profit
 * @bestDayToSell - index of day from @prices which has biggest possible profit
 * @generatePrices - function for generating new @prices array
 * @calculateProfit - function for calculation of @maxProfit , @bestDayToBuy , @BestDayToSell variables
 */
const PricesContext = createContext({
  prices: [],
  maxProfit: 0,
  bestDayToBuy: 0,
  bestDayToSell: 0,
  generatePrices: () => {},
  calculateProfit: () => {}
});

/**
 * context provider for stock prices data
 * @param {*} props
 */
export const PricesContextProvider = (props) => {
  /**
   * @prices - array of stock prices for each day
   * @maxProfit - maximum possible profit for current @prices array
   * @bestDayToBuy - index of day from @prices which has biggest possible profit
   * @bestDayToSell - index of day from @prices which has biggest possible profit
   */
  const [prices, setPrices] = useState([]);
  const [maxProfit, setMaxProfit] = useState(0);
  const [bestDayToBuy, setBestDayToBuy] = useState(0);
  const [bestDayToSell, setBestDayToSell] = useState(0);

  /**
   * function for calculation of @maxProfit , @bestDayToBuy , @BestDayToSell variables
   */
  const calculateProfit = () => {
    //helper variables for easier calculations
    let dayIndex = 0;
    let bestProfit = 0;
    let bestBuyDay = 0;
    let bestSellDay = 0;
    let currentProfit;

    //cycle for buying days
    for (let buyDay = 0; buyDay < prices.length; buyDay += 1) {
      //cycle for selling days
      for (let sellDay = dayIndex; sellDay < prices.length; sellDay += 1) {
        //calculation of profit
        currentProfit = prices[sellDay] - prices[buyDay];
        //conditional reassign of helper variables
        if (prices[buyDay] < prices[sellDay] && currentProfit > bestProfit) {
          bestProfit = currentProfit;
          bestBuyDay = buyDay + 1;
          bestSellDay = sellDay + 1;
        }
      }
      dayIndex += 1;
    }

    //changing context data
    setBestDayToBuy(bestBuyDay);
    setBestDayToSell(bestSellDay);
    setMaxProfit(bestProfit);
  };

  /**
   * function for generating new @prices array with random numbers between 1 and 10
   * @param {*} numberOfDays
   */
  const generatePrices = (numberOfDays) => {
    let newPrices = Array.from({ length: numberOfDays }, () =>
      Math.floor(Math.random() * 10 + 1)
    );
    setPrices(newPrices);
    calculateProfit();
  };

  /**
   * real context data structure and assigned variables/methods
   */
  const context = {
    prices: prices,
    maxProfit: maxProfit,
    bestDayToBuy: bestDayToBuy,
    bestDayToSell: bestDayToSell,
    generatePrices: generatePrices,
    calculateProfit: calculateProfit
  };

  return (
    <PricesContext.Provider value={context}>
      {props.children}
    </PricesContext.Provider>
  );
};

export default PricesContext;
