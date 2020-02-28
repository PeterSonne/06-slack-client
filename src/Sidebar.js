import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./styles/Sidebar.css";
import { log } from "util";
import Axios from "axios";

class Sidebar extends Component {
  // Data
  state = {
    workspace: "Tortuga Coders",
    channels: []
  };
  // Lifecycle
  componentWillMount() {
    Axios.get(`${process.env.REACT_APP_API}/channels`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(docs => {
        this.setState({
          channels: docs.data.map((e, i) => {
            e.active = i == 0 ? true : false;
            return e;
          })
        });
      })
      .catch(err => console.log(err));
  }
  // Methods
  logout = () => {
    localStorage.removeItem("token");
    // console.log(this.props);
    this.props.history.push("/");
  };
  selectChannel = id => {
    let channels = this.state.channels.map(e => {
      e.active = e._id == id;
      return e;
    });
    this.setState({ channels });
  };
  // Render
  render() {
    return (
      <div id="sidebar">
        <h2>{this.state.workspace}</h2>
        <ul className="list-unstyled">
          {this.state.channels.map(channel => {
            return (
              <li
                key={channel._id}
                className={channel.active ? "active" : ""}
                onClick={() => this.selectChannel(channel._id)}
              >
                # {channel.name}
              </li>
            );
          })}
        </ul>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default withRouter(Sidebar);
