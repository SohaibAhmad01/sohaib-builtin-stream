import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header=()=>{
    return(
        <div className="ui secondary menu">
            <Link to="/" className="item">Streamer</Link>
            <div className="right menu">
                <Link to="/" className="item">All stream</Link>
                <GoogleAuth/>
                <Link to="/" className="item"></Link>

            </div>
        </div>
    );
}
export default Header;