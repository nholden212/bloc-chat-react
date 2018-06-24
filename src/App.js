import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import User from './components/User.js';

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
  constructor(props){
    super(props);
    this.state = {
      activeRoomId: "",
      activeRoom: "",
      user: "Guest"
    };
    this.setUser = this.setUser.bind(this);
  }

  activateRoom(id, name){
    this.setState({
      activeRoomId: id,
      activeRoom: name
    })
  }

  setUser(user){
    if(user === null){
      this.setState({
        user: "Guest"
      });
    } else {
      this.setState({
        user: user.displayName
      });
    }
  }

  render() {
    return (
      <div className="App">
        <RoomList
          firebase={firebase}
          activeRoomId={this.state.activeRoomId}
          activeRoom={this.state.activeRoom}
          activateRoom={(id, name) => this.activateRoom(id, name)}
        />
        <User
          firebase={firebase}
          user={this.state.user}
          setUser={(user) => this.setUser(user)}
        />
      </div>
    );
  }
}

export default App;
