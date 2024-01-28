import { useEffect, useState } from 'react'
import { evaluate } from 'mathjs'
import '../All.css'

function Calculator() {
  const [displayNum, setDisplayNum] = useState("");
  const [beenRounded, setBeenRounded] = useState(false);

  function cleanAndEval(expression){
    setBeenRounded(false);
    for(let currChar = 0; currChar<expression.toString().length;currChar++){
      expression = expression.toString().replace("×", "*");
      expression = expression.toString().replace("÷", "/");
      expression = expression.toString().replace("–", "-");
    }
    if((expression.toString()[expression.toString().length+1] == "+") || (expression.toString()[expression.length+1] == "-")){ //if it ends in + or - with no num after it
      expression = expression.toString()+"0"; //just put a 0 at the end. therefore +0 or -0. therefore like no  no error
    }
    else if((expression.toString()[expression.toString().length+1] == "*") || (expression.toString()[expression.length+1] == "-")){
      expression = expression.toString()+"1";
    }
    //need cleaning for when more then 1 operator in a row e.g. "2//1" or "2***1" or "2/*/*/2". ++ and -- dont seem to throw errors
    let evaluatedSum = evaluate(expression);
    if((evaluatedSum.toString()).length > 11){ //11 characters is max width otherwise some numbers go off the screen and cant be read
      evaluatedSum = roundValue(evaluatedSum); //format the number in a readable way
      setBeenRounded(true);
      if((evaluatedSum.toString()).length > 11){
        evaluatedSum = convertToIN(evaluatedSum); //index notation if still too big
      }
    }
    else if (evaluatedSum.toString() == "NaN"){
      evaluatedSum = 0;
    }
    return evaluatedSum;
  }

  function convertToIN(expression){//convert to index notation i.e. 2,400,000 = 2.40 * 10^6, 0.0456 = 4.56 * 10^-2
    let expressionStr = expression.toString();
    let periodLocation = expressionStr.indexOf(".");
    if(periodLocation < 0){
      periodLocation = expressionStr.length;
    }
    let firstSF; //location of first sig fig. iterate through array maybe? or search using regex maybe
    for(let currentFig = 0; currentFig < expressionStr.length; currentFig++){
      if(expressionStr[currentFig] != "0" && expressionStr[currentFig] != "."){
        firstSF = currentFig;
        break;
      }
    }
    let powerOf = periodLocation - firstSF - 1; //this is the power of 10 in the index notation

    let indexNotated = `${expressionStr[firstSF]}.${expressionStr[firstSF+1]}${expressionStr[firstSF+2]}${expressionStr[firstSF+3]} × 10^${powerOf}` // this is for 3 sig fig
    return indexNotated;
    
  }

  function roundValue(expression){//the aim here is to make the expression not stupidly long. so "6.6664732583622743" -> "6.67 to 3 s.f". will be combined with convertToIN to make input look nice. this function will be performed first
    let roundedValue = parseFloat(expression.toPrecision(4)) //3 sig fig
    return roundedValue;
  }

  const buttonValues = ["7","8","9","÷","4","5","6","×","1","2","3","–","C","0","+","="];

  function handleClick(value){
    let sum = displayNum;
    if(value == "=" || value == "ENTER"){
      sum = cleanAndEval(displayNum);
      setDisplayNum(sum);
    }
    else if(value === "C"){
      sum = "";
      setBeenRounded(false);
      setDisplayNum(sum);
    }
    else{
      sum = `${sum}${value}`;
      setDisplayNum(sum);
    }
  }

  useEffect(() => {
    function handleKeyDown(e){
      let keyToPass = (e.key).toUpperCase();
      let possibleClicks = ["7","8","9","/","4","5","6","*","1","2","3","-","C","0","+","=","ENTER"];
      let isPossible = (possibleClicks.indexOf(keyToPass) > -1);
      if(isPossible){
        /*beautify*/
        keyToPass = keyToPass.toString().replace("*", "×");
        keyToPass = keyToPass.toString().replace("/", "÷");
        keyToPass = keyToPass.toString().replace("-", "–");
        handleClick(keyToPass); //treat as button
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return() =>{
      window.removeEventListener('keydown', handleKeyDown)
    };
  }, [displayNum]);

  return (
    <div className="main calculator">
      <h2>Calculator</h2>
      <div className="calcBody">
        <div className="calcDisplay">
          <p>{displayNum}</p>
        </div>
        <div className="sigfigInfo">
          <p>{beenRounded ? "rounded to 4 s.f" : ""}</p>
        </div>
        {buttonValues.map((buttonValue, index) => {
          return(
            <button type="button" key={index} className="calcButton" onClick={() => handleClick(buttonValue)}>{buttonValue}</button>
        )})}
      </div>
    </div>
  )
}

export default Calculator;