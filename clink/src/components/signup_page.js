import React from "react";
import {Link} from 'react-router-dom';

const SignupPage = () =>
{
    return (
      <form>
        <h3>Sign Up</h3>

        <div className="formGroup">
          <label>First name</label>
          <input type="text" className="formControl" placeholder="First name" />
        </div>

        <div className="formGroup">
          <label>Last name</label>
          <input type="text" className="formControl" placeholder="Last name" />
        </div>

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

        <button type="submit" className="submitButton">
          Sign Up
        </button>
        <p className="forgotPassword">
          Already registered? <Link to='/login'>Sign in</Link>
        </p>
      </form>
    );
}

export default SignupPage;