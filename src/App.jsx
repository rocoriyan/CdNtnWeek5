import { useState } from 'react'
import { evaluate } from 'mathjs'
import './App.css'

function App() {
  const [displayNum, setDisplayNum] = useState();

  let sum;

  if(displayNum === undefined){
    sum = "";
  }
  else{
    sum = displayNum;
  }

  const buttonValues = ["7","8","9","÷","4","5","6","×","1","2","3","–","C","0","+","="];

  function handleClick(value){
    if(value == "="){
      sum = evaluate(displayNum);
      setDisplayNum(sum);
    }
    else if(value == "×"){
      sum=`${sum}*`;
      setDisplayNum(sum);
    }
    else if(value == "÷"){
      sum=`${sum}/`;
      setDisplayNum(sum);
    }
    else if(value == "–"){
      sum=`${sum}-`;
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
    <div className="mainContainer">
      <div className="navbar">
        <button>Early tasks</button>
        <button>Calculator</button>
        <button>To do list</button>
      </div>
      <div className="main calculator">
        <h1>Calculator App</h1>
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
    </div>
  )
}

export default App