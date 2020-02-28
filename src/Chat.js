import React, { Component } from "react";
import "./styles/Chat.css";
import Sidebar from "./Sidebar";
import Messages from "./Messages";

class Chat extends Component {
  // Render
  render() {
    return (
      <div id="wrap">
        <Sidebar />
        <Messages />
      </div>
    );
  }
}

export default Chat;
