import { useState } from "react";

import "./UseStateHook.css";

const UseStateHook = () => {
  const [count, setCount] = useState<number>((): number => 0);

  return (
    <section className="counter">
      <h1 className="counter__number">{count}</h1>
      <div className="counter__controls">
        <button
          type="button"
          className="decrease-btn btn"
          onClick={() => setCount((prev) => prev - 1)}
        >
          Decrease
        </button>
        <button
          type="button"
          className="reset-btn btn"
          onClick={() => setCount(() => 0)}
        >
          Reset
        </button>
        <button
          type="button"
          className="increase-btn btn"
          onClick={() => setCount((prev) => prev + 1)}
        >
          Increase
        </button>
      </div>
    </section>
  );
};

export default UseStateHook;
