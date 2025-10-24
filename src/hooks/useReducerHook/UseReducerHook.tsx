import { useReducer } from "react";
import "./UseReducerHook.css";

type CounterState = {
  count: number;
};

const COUNTER_ACTION_TYPES = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  RESET: "RESET",
} as const;

type CounterActionType =
  (typeof COUNTER_ACTION_TYPES)[keyof typeof COUNTER_ACTION_TYPES];

const initialState: CounterState = {
  count: 0,
};

function counterReducer(
  state: CounterState,
  action: { type: CounterActionType }
): CounterState {
  switch (action.type) {
    case COUNTER_ACTION_TYPES.DECREMENT: {
      return { count: state.count - 1 };
    }
    case COUNTER_ACTION_TYPES.RESET: {
      return initialState;
    }
    case COUNTER_ACTION_TYPES.INCREMENT: {
      return { count: state.count + 1 };
    }
    default: {
      return state;
    }
  }
}

const UseReducerHook = () => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  const handleDecrement = () =>
    dispatch({
      type: COUNTER_ACTION_TYPES.DECREMENT as CounterActionType,
    });
  const handleReset = () =>
    dispatch({
      type: COUNTER_ACTION_TYPES.RESET as CounterActionType,
    });
  const handleIncrement = () =>
    dispatch({
      type: COUNTER_ACTION_TYPES.INCREMENT as CounterActionType,
    });

  return (
    <section className="counter">
      <h1 className="count">{state.count}</h1>
      <div className="counter-controls">
        <button type="button" className="btn" onClick={handleDecrement}>
          Decrease
        </button>
        <button type="button" className="btn" onClick={handleReset}>
          Reset
        </button>
        <button type="button" className="btn" onClick={handleIncrement}>
          Increase
        </button>
      </div>
    </section>
  );
};

export default UseReducerHook;
