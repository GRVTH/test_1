import PricesContext from "./../context/PricesContext";
import { useRef, useContext } from "react";

const DAYS_LIMIT = 14;
const TIME_TO_DATE = 1000 * 3600 * 24;

/**
 * component for getting user input
 */
const UserInput = () => {
  /**
   * refs for getting data from inputs
   */
  const getStartInput = useRef();
  const getEndInput = useRef();

  const pricesCtx = useContext(PricesContext);

  /**
   * Handler method for getting user data, passing it to Context and generating new Context Data
   * @param {*} event
   */
  const submitHandler = (event) => {
    event.preventDefault();
    const startDate = new Date(getStartInput.current.value);
    const endDate = new Date(getEndInput.current.value);

    const numberOfDays =
      (endDate.getTime() - startDate.getTime()) / TIME_TO_DATE + 1;

    pricesCtx.generatePrices(
      numberOfDays < DAYS_LIMIT ? numberOfDays : DAYS_LIMIT
    );
  };

  return (
    <form onSubmit={submitHandler}>
      <label>Start Day</label>
      <input type="date" required ref={getStartInput}></input>
      <label>End Day</label>
      <input type="date" required ref={getEndInput}></input>
      <button>Generate Output</button>
    </form>
  );
};

export default UserInput;
