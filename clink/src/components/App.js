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

// ///////////////
//Form selection arrays
// ///////////////

var sportsList = ['Archery', 'Badminton', 'Baseball', 'Basketball',
'Boxing', 'Bowling', 'Cricket', 'Cross Country', 'Cycling',
'Competitive Cheerleading', 'Darts', 'Field Hockey',
'Figure Skating', 'Fishing', 'Football', 'Gymnastics',
'Horseback Riding', 'Ice Hockey', 'Lacrosse', 'Martial Arts',
'Rock Climbing', 'Rugby', 'Soccer', 'Surfing', 'Swimming & Diving',
'Tennis', 'Track & Field', 'Triathlon', 'Volleyball',
'Water Polo', 'Weightlifting', 'Wrestling'];


// ///////////////
// End
// ///////////////


function getLinkButtons(loggedIn)
{
  if(loggedIn)
  {
    return (
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
    );
  }
  else
  {
    return (
      <div className="button-group">

        <Link to='/about'>
          <button className="link-button1">About</button>
        </Link>

        <Link to='/login'>
          <button className="link-button1">Log In</button>
        </Link>

        <Link to='/signup'>
          <button className="link-button1">Sign Up</button>
        </Link>

      </div>
    );
  }
}

function getRouter(loggedIn)
{
  if(loggedIn)
  {
    return (
      <Switch>
        <Route exact path="/" component={AboutPage}/>
        <Route exact path="/about" component={AboutPage}/>
        <Route exact path="/change_profile" component={NextPage}/>
        <Route exact path="/change_profile/sports" 
          render={(props) =>
            <GeneralForm {...props}
              title={"Sports Information"}
              entries={sportsList}
              trueEntries={['Soccer']}
              maxEntries={4}
            />
          }
        />
        <Route exact path="/404_error" component={ErrorPage}/>
        <Redirect to="/404_error"/>
      </Switch>
    );
  }
  else
  {
    return (
      <Switch>
        <Route exact path="/" component={AboutPage}/>
        <Route exact path="/about" component={AboutPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/signup" component={SignupPage}/>
      
        <Redirect to="/login"/>
      </Switch>
    );
  }
}

class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      hasSetLogin: false
    }
  }

  render()
  {
    var loggedIn;

    if(this.state.hasSetLogin)
    {
      loggedIn = sessionStorage.getItem("isLoggedIn");
    }
    else
    {
      loggedIn = false;
      this.setState({ hasSetLogin: true });
    }

    return (
      <div className="App">
        <img src='clink_logo.jpg' alt="Clink logo" id="page-logo"/>

        <hr/>
        {getLinkButtons(loggedIn)}
        <hr/>

        {getRouter(loggedIn)}
      
      </div>
    );
  }
}

export default App;