import React from "react";
import {withRouter, Link} from 'react-router-dom';


class LoginPage extends React.Component
{
  submitLoginForm(event)
  { 
    event.preventDefault();
    
    sessionStorage.setItem('isLoggedIn', true);
    window.location = "/about";
  }

  render()
  {
    return (
      <form onSubmit={this.submitLoginForm} className="login-form">
        <h3>Sign In</h3>

        <div>
          <label>Email address</label>
          <input
            type="email"
            className="login-input"
            placeholder="Enter username"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            className="login-input"
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="login-button">
          Submit
        </button>
        <p className="forgotPassword">
          Not registered? <Link to='/signup'>Sign up</Link>
        </p>
      </form>
    );
  }
}

export default withRouter(LoginPage);