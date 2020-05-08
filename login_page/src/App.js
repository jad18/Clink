import React from "react";
import "./styles.css";
import SignupPage from "./Signup_page.js";
import {Link,Switch, Route} from 'react-router-dom';

export default function App() {
  return (
    <div className="App"> 
    <body>
      <h1>Welcome To Clink</h1>
      <h2>Lets find some friends</h2>
   
    <form> 
      <div className="inputs-login">
          <p>username/ID</p>
          <input type="username" />
          <p>Password</p>
          <input type="password" />
     </div>  
      <Link to ='/log'>
        <button className="login">Login</button>
        </Link>
      </form>
    
      <p className="account">Dont have an account?</p>
    
      </body>
      <div><Link to='/sign'>
        <button class="signup-link">Signup</button>
      </Link>
      </div>
      <Switch>
          <Route exact path="/sign" component={SignupPage}/>
        </Switch>
   
    </div>
  );
}
