import './All.css'
import { Form } from "react-router-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/calculator" className="noStyling"><span>Calculator</span></Link>
      <Link to="/todo" className="noStyling"><span>To-do list</span></Link>
    </div>
  );
}

export default Navbar