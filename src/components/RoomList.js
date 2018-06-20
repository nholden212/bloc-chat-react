import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      inputText: ""
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    })
  }

  textUpdate(e) {
    this.setState({ inputText: e.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    if (!this.state.inputText) { return }
    const newRoom = this.state.inputText;
    this.roomsRef.push({
      name: this.state.inputText
    });
    this.setState({ inputText: "" });
  }

  render(){
    return (
      <section className="rooms-page">
        <div className="room-list">
          <h1>Available rooms:</h1>
          {this.state.rooms.map( (room, index) =>
                <div key={index}>{room.name}</div>
              )}
        </div>
        <form className="create-room-form" onSubmit={(e) => this.createRoom(e)}>
          <h3>Create a new chat room:</h3>
          <label htmlFor="room-name-input">Chat Room Name:</label>
          <input type="text" id="room-name-input" value={this.state.inputText} onChange={(e) => this.textUpdate(e)}></input>
          <button type="submit">Submit</button>
        </form>
      </section>
    )
  }
}

export default RoomList;
