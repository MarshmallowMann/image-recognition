import React from "react";
import Tilt from "react-tilt/dist/tilt";
import "./logo.css";
import  Icon from "./icon.png";
const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 40 }} style={{ height: 250, width: 250 }} >
                <div className="Tilt-inner pa3" >
                    <img alt="logo" src={Icon}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo