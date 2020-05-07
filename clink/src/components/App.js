import React from 'react';
import '../App.css';
import {Route, Switch, Link, Redirect} from 'react-router-dom';

//Page imports
import HomePage from './home_page.js';
import NextPage from './profile_change_home.js';
import ErrorPage from './404_error.js';
import SportsForm from './sports_form.js';

function App() {
  return (
    <>
    <div className="App">
      <h1 id='top-header'>Welcome to Clink!</h1>
      <h2>Find friends anonymously</h2>

      <hr/>
      <div class="button-group">

        <Link to='/'>
          <button class="link-button1">Home</button>
        </Link>

        <Link to='/change_profile/sports'>
          <button class="link-button1">Profile</button>
        </Link>

        <button class="link-button1">Messages</button>

        <Link to='/change_profile'>
          <button id="change-profile-button">Change Profile</button>
        </Link>

        </div>
        <hr/>

        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/change_profile" component={NextPage}/>
          <Route exact path="/change_profile/sports" component={SportsForm}/>
          <Route exact path="/404_error" component={ErrorPage}/>
          <Redirect to="/404_error"/>
        </Switch>
      
    </div>
    </>
  );
}

export default App;