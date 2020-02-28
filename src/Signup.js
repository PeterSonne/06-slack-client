import React from "react";
import Axios from "axios";

class Signup extends React.Component {
  // Data
  state = {
    user: {
      name: "",
      email: "",
      password: ""
    },
    errorMsg: ""
  };
  // Methods
  signup = e => {
    e.preventDefault();
    this.setState({ errorMsg: "" });
    if (Object.values(this.state.user).filter(e => e.length == 0).length > 0) {
      return;
    }
    Axios.post(`${process.env.REACT_APP_API}/users/signup`, this.state.user)
      .then(usr => {
        if (usr.data.token != null) {
          localStorage.setItem("token", usr.data.token);
          this.props.history.push("/");
        } else {
          console.log(usr);
          this.setState({ errorMsg: usr.data.message });
        }
      })
      .catch(err => this.setState({ errorMsg: err }));
  };
  changeInput = (e, field) => {
    let user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });
  };
  // Render
  render() {
    return (
      <form className="card" onSubmit={this.signup}>
        <input
          type="text"
          placeholder="Full Name"
          value={this.state.user.name}
          onChange={e => this.changeInput(e, "name")}
        />
        <input
          type="text"
          placeholder="Email"
          value={this.state.user.email}
          onChange={e => this.changeInput(e, "email")}
        />
        <input
          type="password"
          placeholder="Password"
          value={this.state.user.password}
          onChange={e => this.changeInput(e, "password")}
        />
        <button type="submit" className="positive">
          Signup
        </button>
        <div className="link">
          <a href="/login">Already have an account? Login</a>
        </div>
        <div className="error">{this.state.errorMsg}</div>
      </form>
    );
  }
}

export default Signup;
