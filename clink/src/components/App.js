import React from 'react';
import '../App.css';
import {Route, Switch, Link, Redirect} from 'react-router-dom';

//Page imports
import AboutPage from './about_page.js';
import ChangeProfilePage from './profile_change_home.js';
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


// ///////////////
// Initialization of profile
// ///////////////

{
  let loggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));

  if(loggedIn)
  {
    if(!JSON.parse(sessionStorage.getItem("initProfile")))
    {
      sessionStorage.setItem("initProfile", "true");
      sessionStorage.setItem("profile_sports", JSON.stringify(["Soccer", "Baseball"]));
    }
  }
  else if(loggedIn === null)
  {
    sessionStorage.setItem("isLoggedIn", "false");
  }
}


// ///////////////
// End
// ///////////////


function logOut()
{
  sessionStorage.clear();
  sessionStorage.setItem("isLoggedIn", "false");
  window.location="/login";
}


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

        <button className="link-button1" onClick={logOut}>Log Out</button>

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
        <Route exact path="/change_profile" component={ChangeProfilePage}/>
        <Route exact path="/change_profile/sports" 
          render={(props) =>
            <GeneralForm {...props}
              title={"Sports Information"}
              entries={sportsList}
              profileType={"sports"}
              trueEntries={JSON.parse(sessionStorage.getItem("profile_sports"))}
              maxEntries={4}
              nextPageLink="/change_profile"
            />
          }
        />
        <Redirect to="/about"/>
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
      loggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
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