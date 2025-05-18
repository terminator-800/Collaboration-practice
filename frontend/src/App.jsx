import React, { useState } from "react";
import axios from "axios";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
  if (value === "AC") {
    setInput("");
  } else if (value === "=") {
    try {
      // Evaluate the input expression
      // eslint-disable-next-line no-eval
      const result = eval(input).toString();
      setInput(result);

      // Send expression and result to backend
      axios.post("http://localhost:5000", {
        expression: input,
        result: result
      })
      .then(res => console.log("Sent to backend:", res.data))
      .catch(err => console.error("Error sending to backend:", err));
      
    } catch {
      setInput("Error");
    }
  } else if (value === "+/-") {
    if (input) setInput((parseFloat(input) * -1).toString());
  } else {
    setInput(input + value);
  }
};


  return (
    <div className="w-full max-w-xs mx-auto mt-10 bg-black text-white rounded-xl overflow-hidden shadow-lg">
      <div className="text-right p-4 text-4xl font-mono bg-black text-white">
        {input || "0"}
      </div>
      <div className="grid grid-cols-4 gap-2 p-2 bg-black">
        <button onClick={() => handleClick("AC")} className="py-4 text-xl rounded-full bg-gray-400">AC</button>
        <button onClick={() => handleClick("+/-")} className="py-4 text-xl rounded-full bg-gray-400">+/-</button>
        <button onClick={() => handleClick("%") } className="py-4 text-xl rounded-full bg-gray-400">%</button>
        <button onClick={() => handleClick("/")} className="py-4 text-xl rounded-full bg-orange-400">÷</button>

        <button onClick={() => handleClick("7")} className="py-4 text-xl rounded-full bg-gray-800">7</button>
        <button onClick={() => handleClick("8")} className="py-4 text-xl rounded-full bg-gray-800">8</button>
        <button onClick={() => handleClick("9")} className="py-4 text-xl rounded-full bg-gray-800">9</button>
        <button onClick={() => handleClick("*")} className="py-4 text-xl rounded-full bg-orange-400">×</button>

        <button onClick={() => handleClick("4")} className="py-4 text-xl rounded-full bg-gray-800">4</button>
        <button onClick={() => handleClick("5")} className="py-4 text-xl rounded-full bg-gray-800">5</button>
        <button onClick={() => handleClick("6")} className="py-4 text-xl rounded-full bg-gray-800">6</button>
        <button onClick={() => handleClick("-")} className="py-4 text-xl rounded-full bg-orange-400">−</button>

        <button onClick={() => handleClick("1")} className="py-4 text-xl rounded-full bg-gray-800">1</button>
        <button onClick={() => handleClick("2")} className="py-4 text-xl rounded-full bg-gray-800">2</button>
        <button onClick={() => handleClick("3")} className="py-4 text-xl rounded-full bg-gray-800">3</button>
        <button onClick={() => handleClick("+")} className="py-4 text-xl rounded-full bg-orange-400">+</button>

        <button onClick={() => handleClick("0")} className="py-4 text-xl rounded-full bg-gray-800 col-span-2">0</button>
        <button onClick={() => handleClick(".")} className="py-4 text-xl rounded-full bg-gray-800">.</button>
        <button onClick={() => handleClick("=")} className="py-4 text-xl rounded-full bg-orange-400">=</button>
      </div>
    </div>
  );
};

export default Calculator;