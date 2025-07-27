function Calculator() {
  const [display, setDisplay] = React.useState({
    current: "0",
    expression: "",
    isInitial: true
  });

  const handleNumber = (value) => {
    const newValue = display.isInitial ? value : display.current + value;
    setDisplay({
      ...display,
      current: newValue,
      isInitial: false
    });
  };

  const btnAllClear = () => {
    setDisplay({
      current: "0",
      expression: "",
      isInitial: true
    });
  };

  const btnCancel = () => {
    setDisplay({
      ...display,
      current: "0",
      isInitial: true
    });
  };

 const handleOperation = (op) => {
  let { current, expression, isInitial } = display;

  if (op === "%") {
    const result = parseFloat(current) / 100;
    setDisplay({
      ...display,
      current: result.toString(),
      isInitial: true
    });
    return;
  }

  if (op === "=") {
    // Complete the expression and evaluate
    const fullExpr = expression + current;
    try {
      const result = eval(fullExpr.replace(/X/g, "*"));
      setDisplay({
        current: result.toString(),
        expression: "", // Expression cleared after "="
        isInitial: true,
        lastResult: result.toString() // Optional if you want to store last result
      });
    } catch (e) {
      setDisplay({
        current: "Error",
        expression: "",
        isInitial: true
      });
    }
  } else {
    // If expression is empty but user just pressed "=" before, reuse current
    if (expression === "") {
      expression = current + " " + op + " ";
    } else {
      expression += current + " " + op + " ";
    }

    try {
      const result = eval(expression.replace(/X/g, "*").slice(0, -3)); // remove trailing op for eval
      setDisplay({
        current: result.toString(),
        expression: expression,
        isInitial: true
      });
    } catch (e) {
      setDisplay({
        current: "Error",
        expression: "",
        isInitial: true
      });
    }
  }
};


  const renderButton = (text, onClick, extraClass = "") => (
    <div className={`overlap-group-wrapper ${extraClass}`} onClick={onClick}>
      <div className="overlap-group-2">
        <div className="rounded-rectangle-2"></div>
        <div className="text-wrapper">{text}</div>
      </div>
    </div>
  );

  return (
    <div className="calculator">
      <div className="text-wrapper-3">{display.expression}</div>
      <div className="text-wrapper-4">{display.current}</div>
      <div className="grid-buttons">
        {renderButton("AC", btnAllClear)}
        {renderButton("C", btnCancel)}
        {renderButton("%", () => handleOperation("%"))}
        {renderButton("/", () => handleOperation("/"))}

        {renderButton("7", () => handleNumber("7"))}
        {renderButton("8", () => handleNumber("8"))}
        {renderButton("9", () => handleNumber("9"))}
        {renderButton("X", () => handleOperation("X"))}

        {renderButton("4", () => handleNumber("4"))}
        {renderButton("5", () => handleNumber("5"))}
        {renderButton("6", () => handleNumber("6"))}
        {renderButton("-", () => handleOperation("-"))}

        {renderButton("1", () => handleNumber("1"))}
        {renderButton("2", () => handleNumber("2"))}
        {renderButton("3", () => handleNumber("3"))}
        {renderButton("+", () => handleOperation("+"), "button-span-2-rows")}

        {renderButton("0", () => handleNumber("0"))}
        {renderButton(".", () => handleNumber("."))}
        {renderButton("=", () => handleOperation("="))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Calculator />);
