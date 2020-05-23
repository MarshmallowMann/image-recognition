import React, { Component } from 'react';
import Navigation from "./components/navigation/navigation";
import './App.css';
import Logo from "./components/Logo/logo"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/rank";
import Particles from "react-particles-js";
const particleOptions = {
    "particles": {
    "number": {
        "value": 50
    },
    "size": {
        "value": 3
    }
},
    "interactivity": {
    "events": {
        "onhover": {
            "enable": true,
                "mode": "repulse"
        }
    }
}}



class App extends Component {
  render() {
    return (
      <div className="App">
          <Particles className="particles"
              params={particleOptions}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/*<FaceRecognition /> */}
      </div>
    );
  }
}


export default App;
