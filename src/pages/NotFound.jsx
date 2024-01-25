import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return(
        <div className="error main">
            <h1>Page not found!</h1>
            <span>Return <Link to="/">home</Link></span>
        </div>
    )
};

export default NotFound;