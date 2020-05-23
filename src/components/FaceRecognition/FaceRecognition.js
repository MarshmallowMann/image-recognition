import React from "react";


const FaceRecognition = ({imageUrl}) => {
    return (
        <div className="center ma1">
            <div className="absolute mt2">
          <img alt="" src={imageUrl} width="300em" height="auto"/>
            </div>
        </div>
    );
}
export default FaceRecognition