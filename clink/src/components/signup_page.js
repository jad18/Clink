import React from "react";
import {Link} from 'react-router-dom';

class SignupPage extends React.Component
{
  constructor() 
  {
    super();

    this.state = {
      errorMsg: ''
    }

    this.makeRegistrationRequest = this.makeRegistrationRequest.bind(this);
    this.submitRegistrationForm = this.submitRegistrationForm.bind(this);
  }

  async makeRegistrationRequest(event)
  {
    var regisData = {
                      name: event.target.elements['regis-name'].value,
                      username: event.target.elements['regis-username'].value,
                      password: event.target.elements['regis-password'].value};
    console.log(regisData);

    const options = {
      method: 'POST',
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify(regisData)
    }

    try {
      const response = await fetch("http://192.168.1.29:3000/register", options) //change [localhost] to your local IP address
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

  submitRegistrationForm(event)
  {
    event.preventDefault();

    var regisResult = this.makeRegistrationRequest(event); //returns a promise
    const tempThis = this;

    regisResult.then(function(result) {
      if(result===true)
      {
        tempThis.setState({ errorMsg: ''});
        alert("You've created an account. Now log in to get started!")
        window.location = "/login";
      }
      else if(result===false)
      {
        tempThis.setState({ errorMsg: "A user with this username already exists"});
      }
      else
      {
        tempThis.setState({ errorMsg: "An error occurred when requesting from the server"});
      }
    })
  }

  render()
  {
    return (
      <form onSubmit={this.submitRegistrationForm} className='login-form'>
        <h3>Sign Up</h3>

        <div>
          <label>First name</label>
          <input
            type="text"
            id="regis-name"
            className="login-input"
            placeholder="First name"
            required
            />
        </div>

        <div>
          <label>Username</label>
          <input
            type="text"
            id="regis-username"
            className="login-input"
            placeholder="Enter username"
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            id="regis-password"
            className="login-input"
            placeholder="Enter password"
            required
          />
        </div>

        <p>{this.errorMsg}</p>

        <button type="submit" className="login-button">
          Sign Up
        </button>
        <p className="forgotPassword">
          Already registered? <Link to='/login'>Sign in</Link>
        </p>
      </form>
    );
  }
}

export default SignupPage;