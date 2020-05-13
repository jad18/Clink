import React from "react";
import {withRouter} from 'react-router-dom';


class LoginPage extends React.Component
{
  submitLoginForm(event)
  { 
    event.preventDefault();
    alert("Pull the lever, Gronk");
    sessionStorage.setItem('loggedIn', true);
    alert("Login Page result: " + sessionStorage.getItem('loggedIn'));

    window.location = "/about";
  }

  render()
  {
    return (
      <form onSubmit={this.submitLoginForm} className="login-form">
        <h3>Sign In</h3>

        <div className="formGroup">
          <label>Email address</label>
          <input
            type="email"
            className="formControl"
            placeholder="Enter username"
          />
        </div>

        <div className="formGroup">
          <label>Password</label>
          <input
            type="password"
            className="formControl"
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="login-button">
          Submit
        </button>
        <p className="forgotPassword">
          Forgot password?
        </p>
      </form>
    );
  }
}

export default withRouter(LoginPage);