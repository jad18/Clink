import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <form>
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

        <div className="formGroup">
          <div className="checkbox">
            <input type="checkbox" className="inputCheckbox" id="input" />
            <label className="rememberMe" htmlFor="box">
              Remember me
            </label>
          </div>
        </div>

        <button type="submit" className="loginSubmitButton">
          Submit
        </button>
        <p className="forgotPassword">
          Forgot <p href="#">password?</p>
        </p>
      </form>
    );
  }
}
