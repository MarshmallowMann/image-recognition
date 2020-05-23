import React, { Component } from 'react';
import Navigation from "./components/navigation/navigation";
import './App.css';
import Logo from "./components/Logo/logo"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
    apiKey: '5db351149030491ea2393b9905739e3b'
});

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
    constructor() {
        super();
        this.state = {
            input: "",
            imageUrl: ""
        }
    }

    onInputChange = (event) =>
        this.setState({input: event.target.value});
    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input})
        console.log('click');
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
            function(response) {
               console.log(response.outputs[0].data.regions[0].region_info.bounding_box) // do something with response
            },
            function(err) {
                // there was an error
            }
        );
    }

  render() {
    return (
      <div className="App">
          <Particles className="particles"
              params={particleOptions}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}


export default App;
