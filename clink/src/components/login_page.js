import React from "react";

const LoginPage = () =>
{
    return (
      <form className="login-form">
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

export default LoginPage;