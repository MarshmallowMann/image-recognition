import React, { Component } from 'react';
import Navigation from "./components/navigation/navigation";
import './App.css';
import Logo from "./components/Logo/logo"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

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


const initialState =  {
    input: "",
    imageUrl: "",
    box: {},
    route: "signin",
    isSignedIn: false,
    user:{
        entries: 0,
        email: "",
        id: "",
        name: "",

        joined: "",


    }}
class App extends Component {
    constructor() {
        super();
        this.state = initialState
        }


    loadUser = (data) => {
        this.setState({user: {
            email: data.email,
                id: data.id,
                name: data.name,
                entries: data.entries,
                joined: data.joined,
            }
        })
    }

    calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height)
    return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),

    }
}

displayFaceBox = (box) => {
        console.log(box)
        this.setState({box: box});

}
    onInputChange = (event) =>
        this.setState({input: event.target.value});
    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input})
        console.log('click');
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => {
                if (response) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count}))
                        })
                        .catch(console.log)
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            }) // do something with response
            .catch(err=> console.log(err))
    }

    onRouteChange = (route) => {
if (route === "signout"){
    this.setState(initialState)
} else if (route==="home"){
    this.setState({isSignedIn: true})
}
    this.setState({route: route})
    }

  render() {
     const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
          <Particles className="particles"
              params={particleOptions}/>
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          {this.state.route === "home"
              ? <div>

              <Logo/>
                  <Rank
                      name={this.state.user.name}
                      entries={this.state.user.entries}
                  />
              <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
              : (route === "signin"
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>

)}
      </div>
    );
  }
}


export default App;
