import React from "react";
import "./navigation.css";
const Navigation = ({onRouteChange, isSignedIn}) => {

        if (isSignedIn) {
            return(
            < nav style={{display: "flex", justifyContent: "flex-end", marginRight: "5em" }} >
                <p className='f3 link dim black underline-hover pa3 pointer' onClick={()=>onRouteChange("signout")} >Sign Out</p>
            </nav>
            );
        } else {
            return (
                < nav style={{display: "flex", justifyContent: "flex-end", marginRight: "5em" }}>
                    <p className='f3 link dim white underline-hover pa3 pointer' onClick={()=>onRouteChange("signin")}>Sign In</p>
                    <p className='f3 link dim white underline-hover pa3 pointer' onClick={()=>onRouteChange("register")}>Register</p>
                </nav>
        )
            ;
        }

}

export default Navigation