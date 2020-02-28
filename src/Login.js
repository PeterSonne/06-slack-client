import React from "react";
import Axios from "axios";

class Login extends React.Component {
  // Data
  state = {
    user: {
      email: "",
      password: ""
    },
    errorMsg: ""
  };
  // Methods
  login = e => {
    e.preventDefault();
    this.setState({ errorMsg: "" });
    if (Object.values(this.state.user).filter(e => e.length == 0).length > 0) {
      return;
    }
    Axios.post(`${process.env.REACT_APP_API}/users/login`, this.state.user)
      .then(doc => {
        if (doc.data.token == null) {
          this.setState({ errorMsg: doc.data.message });
        } else {
          localStorage.setItem("token", doc.data.token);
          this.props.history.push("/");
        }
      })
      .catch(err => this.setState({ errorMsg: err.message }));
  };
  changeInput = (e, field) => {
    let user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });
  };
  // Render
  render() {
    return (
      <form className="card" onSubmit={this.login}>
        <input
          type="text"
          placeholder="Email"
          onChange={e => this.changeInput(e, "email")}
          value={this.state.user.email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => this.changeInput(e, "password")}
          value={this.state.user.password}
        />
        <button type="submit" className="positive">
          Login
        </button>
        <div className="link">
          <a href="/signup">New here? Create an account</a>
        </div>
        <div className="error">{this.state.errorMsg}</div>
      </form>
    );
  }
}

export default Login;
