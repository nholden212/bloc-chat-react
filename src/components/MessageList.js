import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    let val = this.props.activeRoomId;
    this.messagesRef.orderByChild("roomId").equalTo(val).on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    })
  }

  render(){
    return(
      <section className="message-list-page">
        <h2>Active chat room: {this.props.activeRoom}</h2>
        <h3>Messages:</h3>
        <div className="messages">
          {this.state.messages.map( (message, index) =>
            <div key={index}>{message.content}</div>
          )}
        </div>
      </section>
    )
  }

}

export default MessageList;
