import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';

  var config = {
    apiKey: "AIzaSyCsk-sSQBNVtkwNwUwiXhWh3lDPDjBVQHU",
    authDomain: "bloc-chat-react-212nh.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-212nh.firebaseio.com",
    projectId: "bloc-chat-react-212nh",
    storageBucket: "bloc-chat-react-212nh.appspot.com",
    messagingSenderId: "259639264014"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
