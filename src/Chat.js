import React, { Component } from "react";
import "./styles/Chat.css";
import Sidebar from "./Sidebar";
import Messages from "./Messages";

class Chat extends Component {
  state = {
    selectedChannel: ""
  };
  channelChange = channelId => {
    console.log(channelId);
    this.setState({ selectedChannel: channelId });
  };
  // Render
  render() {
    return (
      <div id="wrap">
        <Sidebar onChangeChannel={this.channelChange} />
        <Messages channelId={this.state.selectedChannel} />
      </div>
    );
  }
}

export default Chat;
