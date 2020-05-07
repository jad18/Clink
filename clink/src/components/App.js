import React from 'react';
import '../App.css';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';

//Page imports
import HomePage from './home_page.js';
import NextPage from './profile_change_home.js';
import ErrorPage from './404_error.js';
import SportsForm from './sports_form.js';

function App() {
  return (
    <>
    <div className="App">
      <h1 size='40'>Welcome to Clink!</h1>
      <h4>Find friends anonymously</h4>
      <Router>
        <hr/>
        <div class="button-group">
          <Link to='/'>
            <button class="link-button1">Home</button>
          </Link>
          <Link to='/change_profile'>
            <button class="link-button1">Next</button>
          </Link>
          <Link to='/sports'>
            <button class="link-button1">Sports</button>
          </Link>
          <button class="link-button1">When</button>
        </div>
        <hr/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/change_profile" component={NextPage}/>
          <Route exact path="/sports" component={SportsForm}/>
          <Route exact path="/404_error" component={ErrorPage}/>
          <Redirect to="/404_error"/>
        </Switch>
      </Router>
      
    </div>
    </>
  );
}

export default App;


/* browserHistory.push('/next-page') */