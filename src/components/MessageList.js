import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputText: ""
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

  textUpdate(e) {
    this.setState({ inputText: e.target.value });
  }

  createMessage(e) {
    e.preventDefault();
    if (!this.state.inputText) { return }
    this.messagesRef.push({
      content: this.state.inputText,
      roomId: this.props.activeRoomId,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.props.user
    });
    this.setState({ inputText: "" });
  }

  render(){
    var filteredMessages = (
      this.state.messages.map( (message) => {
        if(message.roomId === this.props.activeRoomId){
          return <div key={message.key}>
                  <div>{message.content}</div>
                  <div>{message.username}</div>
                </div>
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
        <form className="newMessage" onSubmit={(e) => this.createMessage(e)}>
          <label htmlFor="message-input">Send:</label>
          <input type="text" id="message-input" value={this.state.inputText} onChange={(e) => this.textUpdate(e)}></input>
          <button type="submit">Submit</button>
        </form>
      </section>
    )
  }

}

export default MessageList;
