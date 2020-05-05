import React from 'react';
import '../App.css';
import {BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

//Page imports
import HomePage from './home_page.js';

function App() {
  return (
    <>
    <div className="App">
      <h1 size='40'>Welcome to Clink!</h1>
      <h4>Find friends anonymously</h4>
      <hr/>
      <div class="button-group">
        <button class="link-button1">Home</button>
        <button class="link-button1">What</button>
        <button class="link-button1">Who</button>
        <button class="link-button1">When</button>
      </div>
      <hr/>
    </div>
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
