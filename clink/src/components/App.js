import React from 'react';
import '../App.css';
import {Route, Switch, Link, Redirect} from 'react-router-dom';

//Page imports
import HomePage from './home_page.js';
import NextPage from './profile_change_home.js';
import ErrorPage from './404_error.js';
import GeneralForm from './general_form.js';
import LoginPage from './login_page.js';
import SignupPage from './signup_page.js';

function App() {
  return (
    <>
    <div className="App">
      <h1 id='top-header'>Welcome to Clink!</h1>
      <h2>Find friends anonymously</h2>

      <hr/>
      <div className="button-group">

        <Link to='/home'>
          <button className="link-button1">Home</button>
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
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/home" component={HomePage}/>
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
    </>
  );
}

export default App;