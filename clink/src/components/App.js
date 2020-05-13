import React from 'react';
import '../App.css';
import {Route, Switch, Link, Redirect} from 'react-router-dom';

//Page imports
import AboutPage from './about_page.js';
import NextPage from './profile_change_home.js';
import ErrorPage from './404_error.js';
import GeneralForm from './general_form.js';
import LoginPage from './login_page.js';
import SignupPage from './signup_page.js';

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  render() {
  return (
    <div className="App">
      <img src='clink_logo.jpg' alt="Clink logo" id="page-logo"/>

      <hr/>
      <div className="button-group">

        <Link to='/about'>
          <button className="link-button1">About</button>
        </Link>

        <Link to='/login'>
          <button className="link-button1">Search</button>
        </Link>

        <Link to='/change_profile/sports'>
          <button className="link-button1">Profile</button>
        </Link>

        <button className="link-button1">Messages</button>

        <Link to='/change_profile'>
          <button id="change-profile-button">Change Profile</button>
        </Link>

        </div>
        <hr/>

        <Switch>
          <Route exact path="/" component={AboutPage}/>
          <Route exact path="/about" component={AboutPage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/signup" component={SignupPage}/>
          <Route exact path="/change_profile" component={NextPage}/>
          <Route exact path="/change_profile/sports" 
            render={(props) =>
              <GeneralForm {...props}
                title={"Sports Information"}
                entries={['Football', 'Soccer', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
                trueEntries={['Soccer']}
                maxEntries={4}
              />
            }
          />
          <Route exact path="/404_error" component={ErrorPage}/>
          <Redirect to="/404_error"/>
        </Switch>
      
    </div>
  );
  }
}

export default App;