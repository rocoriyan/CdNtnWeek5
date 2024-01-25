import './All.css'
import { Form } from "react-router-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/initial" class="noStyling"><span>Initial Tasks</span></Link>
      <Link to="/calculator" class="noStyling"><span>Calculator</span></Link>
      <Link to="/todo" class="noStyling"><span>To-do list</span></Link>
    </div>
  );
}

export default Navbar