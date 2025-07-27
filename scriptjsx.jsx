function Calculator() {
  const [display, setDisplay] = React.useState({
    current: "0",
    expression: "",
    isInitial: true
  });

  const handleNumber = (value) => {
    let { current, isInitial } = display;

    if (value === ".") {
      if (current.includes(".")) return;
      current = isInitial || current === "0" ? "0." : current + ".";
    } else {
      current = isInitial || current === "0" ? value : current + value;
    }

    setDisplay({
      ...display,
      current,
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
    let { current, expression } = display;

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
      const fullExpr = expression + current;
      try {
        const result = eval(fullExpr.replace(/X/g, "*"));
        setDisplay({
          current: result.toString(),
          expression: "",
          isInitial: true
        });
      } catch (e) {
        setDisplay({
          current: "Error",
          expression: "",
          isInitial: true
        });
      }
    } else {
      if (expression === "") {
        expression = current + " " + op + " ";
      } else {
        expression += current + " " + op + " ";
      }

      try {
        const result = eval(expression.replace(/X/g, "*").slice(0, -3));
        setDisplay({
          current: result.toString(),
          expression,
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

const renderButton = (text, onClick, extraClass = "") => {
  const isOperator = ["+", "-", "X", "/"].includes(text);

  return (
    <div className={`overlap-group-wrapper ${extraClass}`} onClick={onClick}>
      {isOperator ? (
        <div className="overlap-group-oprations">
          <div className="rounded-rectangle-oprations"></div>
          <div className="text-wrapper-oprations">{text}</div>
        </div>
      ) : (
        <div className="overlap-group-2">
          <div className="rounded-rectangle-2"></div>
          <div className="text-wrapper">{text}</div>
        </div>
      )}
    </div>
  );
};


  return (
    <div className="calculator">
      <div className="text-wrapper-3">{display.expression}</div>
      <div className={`text-wrapper-4 ${display.current.length > 6 ? "rtl-mode" : ""}`}>{display.current}</div>
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
