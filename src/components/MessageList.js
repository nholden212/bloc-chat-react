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
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    })
  }

  render(){
    var filteredMessages = (
      this.state.messages.map( (message) => {
        if(message.roomId === this.props.activeRoomId){
          return <div key={message.key}>{message.content}</div>
        }
        return null;
      })
    );

    return(
      <section className="message-list-page">
        <h2>Active chat room: {this.props.activeRoom}</h2>
        <h3>Messages:</h3>
        <div className="messages">
          {filteredMessages}
        </div>
      </section>
    )
  }

}

export default MessageList;
