import React from "react";
import {withRouter, Link} from 'react-router-dom';


class LoginPage extends React.Component
{
  constructor() 
  {
    super();

    this.state = {
      errorMsg: ''
    }

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

    try {
      const response = await fetch("http://[localhost]:3000/login", options) //change [localhost] to your local IP address
      if(!response.ok)
      {
        alert(response.statusText);
        return null;
      }
      const jsonData = await response.json();
      return jsonData;
    } catch(error) {
        console.log(error);
        return null;
    }
  }


  submitLoginForm(event)
  { 
    event.preventDefault();

    var loginResult = this.makeLoginRequest(event); //returns a promise
    const self = this;

    loginResult.then(function(result) {
      if(result.status===true)
      {
        self.setState({ errorMsg: ''});
        sessionStorage.setItem('isLoggedIn', "true");
        for(var element in result.profile)
        {
          sessionStorage.setItem('profile_' + String(element), JSON.stringify(result.profile[element]));
        }
        alert(sessionStorage.getItem('profile_sports'));
        //sessionStorage.setItem('profile_sports', JSON.stringify(result.profile.sports))
        window.location = "/about";
      }
      else if(result.status===false)
      {
        self.setState({ errorMsg: "Incorrect username or password"});
      }
      else
      {
        self.setState({ errorMsg: "An error occurred when requesting from the server"});
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
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            id='login-password'
            className="login-input"
            placeholder="Enter password"
            required
          />
        </div>

        <p>{this.state.errorMsg}</p>

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