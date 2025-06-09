function Calculator() {
    const [display, setdisplay] = React.useState({
        current: "0",
        total: "0",
        isInitial: true,
        preOps: ""
    });
    function hendleNumber(value){
        let newValue = value;
        if(!display.isInitial){
            newValue = display.current + value;
        }
        

        setdisplay({current: newValue, total: display.total, isInitial: false, preOps: display.preOps});
        console.log(display);
    }
    function hendleopration(ops){
        const total = doCalculation();
        setdisplay({current: total.toString(), total: total.toString(), isInitial: true, preOps: ops})
        }

    function doCalculation(){
        let total = parseInt(display.total);
        switch(display.preOps){
            case "+":
                total += parseInt(display.current);
                break;

            case "-":
                total -=  parseInt(display.current);
                break;

            case "X":
                total *=  parseInt(display.current);
                break;

            case "/":
                total /=  parseInt(display.current);
                break;

            default:
                total =  parseInt(display.current);
        }
        return total;   
    }



    function btncancel() {
        setdisplay({current: "0",
        total: "0",
        isInitial: true,
        preOps: ""});
    }



    return (<div className="Calcbutton">
        <div id="headercalc">Demo Calculator</div>
        <div className="display">{display.current}</div>
        <CalcButton value="7" onClick={hendleNumber} />
        <CalcButton value="8" onClick={hendleNumber} />
        <CalcButton value="9" onClick={hendleNumber} />
        <CalcButton value="/" onClick={hendleopration} />

        <CalcButton value="4" onClick={hendleNumber} />
        <CalcButton value="5" onClick={hendleNumber} />
        <CalcButton value="6" onClick={hendleNumber} />
        <CalcButton value="X" onClick={hendleopration} />

        <CalcButton value="1" onClick={hendleNumber} />
        <CalcButton value="2" onClick={hendleNumber} />
        <CalcButton value="3" onClick={hendleNumber} />
        <CalcButton value="-" onClick={hendleopration} />
            
        <CalcButton value="C" onClick={btncancel} />
        <CalcButton value="0" onClick={hendleNumber} />
        <CalcButton value="=" onClick={hendleopration} />
        <CalcButton value="+" onClick={hendleopration} />

    </div>
    )
}
function CalcButton(number){
    return <button onClick={() => number.onClick(number.value)}>{number.value}</button>
}
const root = ReactDOM.createRoot(document.getElementById("para"));
root.render(<div className="container"><Calculator /></div>); 

