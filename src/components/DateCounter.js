import { useReducer } from "react";

const initialState = { count: 0, step: 1 };
function reducer(state, action) {
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.payLoad };
    case "setStep":
      return { ...state, step: action.payLoad };
    default:
      throw new Error("Invalid action");
  }
}
function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payLoad: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payLoad: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset", payLoad: 0 });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;