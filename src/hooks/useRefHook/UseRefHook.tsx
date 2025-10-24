import { useEffect, useRef, useState } from "react";
import "./UseRefHook.css";

const UseRefHook = () => {
  const [inputValue, setInputValue] = useState(() => "");
  const prevInputValue = useRef<string | null>(null);

  useEffect(() => {
    prevInputValue.current = inputValue;
  });

  return (
    <section className="use-ref__container">
      <p className="prev-value">
        Previous value is :&nbsp;
        {prevInputValue.current ?? "You have not typed yet"}
      </p>
      <label htmlFor="username" className="input-label">
        UserName :&nbsp;
        <input
          className="input-field"
          type="text"
          value={inputValue}
          name="username"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
    </section>
  );
};

export default UseRefHook;
