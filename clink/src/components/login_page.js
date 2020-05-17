import React from "react";
import {withRouter, Link} from 'react-router-dom';


class LoginPage extends React.Component
{
  constructor() 
  {
    super();
    this.submitLoginForm = this.submitLoginForm.bind(this);
  }
  submitLoginForm(event)
  { 
    event.preventDefault();

    //sessionStorage.setItem('isLoggedIn', "true");
    //window.location = "/about";

    const options = {
      method: 'POST',
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify({
        username: true,
        password: false
      })
    }

    //const loginData = FormData(event.target);

    fetch("http://192.168.1.29:3000/login", options)
      .then(res => res.json())
      .then(data => {alert(data); console.log(data)})
      .catch(error => {alert(error); console.log(error)});



    /*
    const loginData = new FormData(event.target);

    const options = {
      method: 'POST',
      headers: {'Content-type': '/login'},
      body: loginData
    }

    //const loginData = FormData(event.target);

    fetch("localhost:3000", options)
      .then(request => request.json())
      .then(data => alert(data))
      .catch();
    */
    //const loginReq = new XMLHttpRequest();
    //loginReq.onload = function () {
      //alert("Got response");
      //sessionStorage.setItem('isLoggedIn', "true");
      //window.location = "/about";
    //}

    /*loginReq.open("GET", "localhost:3000");
    loginReq.setRequestHeader("Content-type", "/login");
    loginReq.send();

    loginReq.onreadystatechange = function()
    {
      if(this.readyState===4) alert(loginReq.responseText);
      else alert("Failed!");
    }*/
  }

  render()
  {
    /*
    return (
      <div>
      {this.errorMessage(messages.error)}
      <form action="/login" method="POST">
        <div>
	          <label for="email">Email: </label>
	          <input type="text" id="email" name="email"
	            required/>
        </div>
        <div>
	        <label for="password">Password: </label>
	        <input type="text" id="password" name="password"
	          required/>
        </div>
          <button type="submit">Login</button>
      </form>
      </div>

    );
      */
    
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