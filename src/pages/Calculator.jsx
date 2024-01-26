import { useState } from 'react'
import { evaluate, index } from 'mathjs'
import '../All.css'
import { Link } from "react-router-dom";

function Calculator() {
  const [displayNum, setDisplayNum] = useState();

  let sum;

  if(displayNum === undefined){
    sum = "";
  }
  else{
    sum = displayNum;
  }

  function cleanAndEval(expression){
    expression = expression.replace("×", "*");
    expression = expression.replace("÷", "/");
    expression = expression.replace("–", "-");
    let evaluatedSum = evaluate(expression);
    if(evaluatedSum.length > 12){ //12 characters is max width otherwise some numbers go off the screen and cant be read
      //let evaluatedSum = convertToIN(roundValue(evaluatedSum)); //format the number in a readable way
    }
    return evaluatedSum;
  }

  function convertToIN(expression){//convert to index notation i.e. 2,400,000 = 2.40 * 10^6, 0.0456 = 4.56 * 10^-2
    /*
    let periodLocation = expression.indexOf(".");
    let firstSF = //location of first sig fig. iterate through array maybe? or search using regex maybe
    let desiredPeriodLocation = firstSF + 1 //we want period to be in the location after that one.
    let powerOf = periodLocation - desiredPeriodLocation; //this is the power of 10 in the index notation

    indexNotated = `${expression[firstSF]}.${expression[firstSF+1]}${expression[firstSF+1]} × 10^${powerOf}`
    return indexNotated;
    */
  }

  function roundValue(expression){//the aim here is to make the expression not stupidly long. so "6.6664732583622743" -> "6.67 to 3 s.f". will be combined with convertToIN to make input look nice. this function will be performed first
    /*
    let periodLocation = expression.indexOf(".");
    roundedValue = parseFloat(number.toPrecision(3)) //3 sig fig
    */
  }

  const buttonValues = ["7","8","9","÷","4","5","6","×","1","2","3","–","C","0","+","="];

  function handleClick(value){
    if(value == "="){
      sum = cleanAndEval(displayNum);
      setDisplayNum(sum);
    }
    else if(value == "C"){
      sum = "";
      setDisplayNum(sum);
    }
    else{
      sum = `${sum}${value}`;
      setDisplayNum(sum);
    }
  }

  return (
    <div className="main calculator">
      <h2>Calculator</h2>
      <div className="calcBody">
        <div className="calcDisplay">
          <p>{displayNum}</p>
        </div>
        {buttonValues.map((buttonValue, index) => {
          return(
            <button key={index} className="calcButton" onClick={() => handleClick(buttonValue)}>{buttonValue}</button>
        )})}
      </div>
    </div>
  )
}

export default Calculator;