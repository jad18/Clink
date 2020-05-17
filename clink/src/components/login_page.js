import React from "react";
import {withRouter, Link} from 'react-router-dom';


class LoginPage extends React.Component
{
  constructor() 
  {
    super();
    this.makeLoginRequest = this.makeLoginRequest.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);
  }

  async makeLoginRequest(event)
  {
    var loginData = {username: event.target.elements['login-username'].value,
                      password: event.target.elements['login-password'].value};
    console.log(loginData);

    const options = {
      method: 'POST',
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify(loginData)
    }

    const response = await fetch("http://[localhost]:3000/login", options) //change [localhost] to your local IP address
    const jsonData = await response.json();
    return jsonData;
  }


  submitLoginForm(event)
  { 
    event.preventDefault();

    var loginPromise = this.makeLoginRequest(event);

    loginPromise.then(function(result) {
      if(result===true)
      {
        sessionStorage.setItem('isLoggedIn', "true");
        window.location = "/about";
      }
    })
  }

  render()
  {
    return (
      <form onSubmit={this.submitLoginForm} className="login-form">
        <h3>Sign In</h3>

        <div>
          <label>Username</label>
          <input
            type="text"
            id="login-username"
            className="login-input"
            placeholder="Enter username"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            id='login-password'
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