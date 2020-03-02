import React, { Component } from "react";
import "./styles/Messages.css";
import "./styles/NewMessage.css";
import axios from "axios";
import moment from "moment";

class Content extends Component {
  // Data
  state = {
    newMessage: {
      text: "",
      file: null
    },
    messages: []
  };
  // Lifecycle
  componentWillMount() {
    if (!this.props.channelId || this.props.channelId == "") {
      return;
    }
    this.loadChannel(this.props.channelId);
  }
  componentWillReceiveProps(newProps) {
    if (!newProps.channelId || newProps.channelId == "") {
      return;
    }
    this.loadChannel(newProps.channelId);
  }
  // Methods
  changeText = e => {
    let newMessage = this.state.newMessage;
    newMessage.text = e.target.value;
    this.setState({ newMessage });
  };
  createMessage = e => {
    e.preventDefault();
  };
  loadChannel = id => {
    if (!id || id == "") {
      return;
    }
    axios
      .get(`${process.env.REACT_APP_API}/messages?channel=${id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => {
        this.setState({ messages: res.data });
      })
      .catch(err => console.log(err));
  };
  // Render
  render() {
    return (
      <div id="messages">
        <div id="content">
          {this.state.messages.map(message => {
            return (
              <div className="message" key={message._id}>
                <span className="user">
                  {message.user == null ? "delete" : message.user.name}
                </span>
                <span className="date">
                  {moment(moment(message.date)).format("D. MMM. YYYY - HH:mm")}
                </span>
                <div className="body">{message.text}</div>
                -> Insert Image
              </div>
            );
          })}
        </div>
        <div id="new-message">
          <form
            onSubmit={e => {
              this.createMessage(e);
            }}
          >
            <input type="file" name="file" onChange={this.addFile} />
            <input
              type="text"
              placeholder="New Message..."
              value={this.state.newMessage.text}
              onChange={e => this.changeText(e)}
            />
            <button type="submit" className="positive">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Content;
