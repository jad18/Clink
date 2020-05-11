import React from "react";
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./index.css";
import {
  BrowserRouter as Router,
  Container,
  Navbar,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="container">
            <Link className="navclink" to={"/sign-in"}>
              Clink
            </Link>
            <div className="collapse" id="navbarToggle">
              <ul className="navitem">
                <li className="item">
                  <Link className="navlink" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
                <li className="item">
                  <Link className="nuplink" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="inputBox">
          <div className="insideTheBox">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
