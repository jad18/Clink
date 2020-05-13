import React from "react";
import {Link} from 'react-router-dom';

const SignupPage = () =>
{
    return (
      <form className='login-form'>
        <h3>Sign Up</h3>

        <div>
          <label>First name</label>
          <input
            type="text"
            className="login-input"
            placeholder="First name" />
        </div>

        <div>
          <label>Last name</label>
          <input
            type="text"
            className="login-input"
            placeholder="Last name" />
        </div>

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
          Sign Up
        </button>
        <p className="forgotPassword">
          Already registered? <Link to='/login'>Sign in</Link>
        </p>
      </form>
    );
}

export default SignupPage;