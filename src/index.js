import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calculation: "",
      display: "0"
    };
    this.updateDisplay = this.updateDisplay.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.calculate = this.calculate.bind(this);
    this.calculation = this.calculation.bind(this);
  }

  buttonsName = [
    ["÷", "divide"],
    ["7", "seven"],
    ["8", "eight"],
    ["9", "nine"],
    ["*", "multiply"],
    ["4", "four"],
    ["5", "five"],
    ["6", "six"],
    ["-", "subtract"],
    ["1", "one"],
    ["2", "two"],
    ["3", "three"],
    ["+", "add"],
    [".", "decimal"],
    ["0", "zero"]
  ];
  onetoNineReg = /[1-9]/;
  operatorStr = /[+,\-,*,÷]+/;
  updateDisplay(number) {
    if (/^0(?!\.)/.test(this.state.display)) {
      if (this.onetoNineReg.test(number)) {
        if (this.state.display[0] === "0") {
          this.setState({
            calculation: this.state.calculation + `${number}`,
            display: `${number}`
          });
        } else {
          this.setState({
            calculation: this.state.calculation + `${number}`,
            display: this.state.display + `${number}`
          });
        }
      } else if (/[.]/.test(number)) {
        this.setState(state => ({
          calculation: this.state.calculation + state.display + `${number}`,
          display: state.display + `${number}`
        }));
      }
    } else if (/\.{1}/.test(this.state.display) && number === ".") {
      console.log("Not allowed");
    } else {
      if (
        this.operatorStr.test(this.state.display[0]) ||
        this.operatorStr.test(number)
      ) {
        this.setState({
          calculation: this.state.calculation + `${number}`,
          display: `${number}`
        });
      } else {
        this.setState(state => ({
          calculation: this.state.calculation + `${number}`,
          display: state.display + `${number}`
        }));
      }
    }
  }
  clearDisplay() {
    this.setState({
      calculation: "",
      display: "0"
    });
    console.clear();
  }
  calculation = string => {
    const operatorReg = /[+,\-,*,÷]+/g;

    const arrayWithoutOperator = string
      .split(/([+,\-,*,÷])(?<![*,\-,+,÷]-)/g)
      .filter(number => /[\d]/.test(number));

    const operatorArray = Array.from(string).filter(operator =>
      operatorReg.test(operator)
    );
    if (operatorArray.length === arrayWithoutOperator.length) {
      operatorArray.shift();
    }

    return arrayWithoutOperator.reduce((a, b) => {
      let numberA = parseFloat(a);
      let numberB = parseFloat(b);

      switch (operatorArray[0]) {
        case "+":
          operatorArray.shift();
          return numberA + numberB;
        case "-":
          operatorArray.shift();
          return numberA - numberB;
        case "*":
          operatorArray.shift();
          return numberA * numberB;
        case "÷":
          operatorArray.shift();
          return numberA / numberB;
        default:
          console.log("error");
      }
    });
  };
  calculate() {
    this.setState(state => ({
      display: this.calculation(state.calculation)
    }));
  }

  render() {
    let pad = this.buttonsName.map(x => {
      return (
        <Button
          key={x + 1}
          id={x[1]}
          value={x[0]}
          updateProps={this.updateDisplay}
          className="greenButtons"
        />
      );
    });
    return (
      <div className="grid-container">
        <div className="display">
          <p>{this.state.calculation}</p>
          <p id="display">{this.state.display}</p>
        </div>
        <button id="clear" className="clear" onClick={this.clearDisplay}>
          AC
        </button>
        {pad}
        <button id="equals" className="equal" onClick={this.calculate}>
          =
        </button>
      </div>
    );
  }
}
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.updateProps(this.props.value);
  }
  render() {
    return (
      <button
        id={this.props.id}
        className={this.props.className}
        onClick={() => this.props.updateProps(this.props.value)}
      >
        {this.props.value}
      </button>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<Calculator />, rootElement);
