import React from 'react';
import '../App.css';
import {Route, Switch, Link, Redirect} from 'react-router-dom';

//Page imports
import AboutPage from './about_page.js';
import ChangeProfilePage from './profile_change_home.js';

import SportsForm from './sports_form.js';
import MoviesForm from './movies_form.js';
import OutdoorForm from './outdoor_form.js';
import IndoorForm from './indoor_form.js';
import CuisineForm from './cuisine_form.js';
import ArtsForm from './arts_form.js';

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

var movieList = ['Action', 'Adventure', 'Anime', 'Biographical',
'Comedy', 'Drama', 'Documentary', 'Dystopian', 'Experimental',
'Fantasy', 'Family', 'First Responder', 'Historical', 'Horror',
'Independent', 'Mystery', 'Musical', 'Noir', 'Psychological/Suspense',
'Reality', 'Romance', 'Sci-fi', 'Thriller', 'War', 'Western'];

var outdoorList = ['Camping', 'Canoeing', 'Fishing', 'Gardening',
'Hiking', 'Ice Skating', 'Kayaking', 'Running', 'Snowboarding',
'Skiing', 'Stargazing', 'Walking', 'Woodwork', 'Yardwork'];

var indoorList = ['Art Projects', 'Board Games', 'Card Games',
'Cleaning', 'Cooking', 'DIY Projects', 'Napping', 
'Reading Books', 'TV/Movies', 'Video Games'];

var cuisineList = ['African', 'American', 'British', 'Cajun', 
'Caribbean', 'Chinese', 'French', 'Greek', 'Indian', 'Indonesian',
'Italian', 'Japanese', 'Korean',  'Lebanese', 'Mexican',
'Middle Eastern', 'Moroccan', 'Peruvian', 'Polish', 'Spanish',
'Thai', 'Turkish', 'Vietnamese'];

var artsList = ['Drawing', 'Dance', 'Fashion', 'Graphic Design',
'Instrument', 'Opera', 'Painting', 'Photography', 'Photoshop',
'Pottery', 'Singing', 'Scenic Design', 'Sculpting',
'Theater Performance', 'Video Editing'];


// ///////////////
// End
// ///////////////


//If first time rendering, set login status to false
if(JSON.parse(sessionStorage.getItem("isLoggedIn")) === null)
{
  sessionStorage.setItem("isLoggedIn", "false");
}


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
            <SportsForm {...props}
              title={"Sports Preferences"}
              entries={sportsList}
              profileType={"sports"}
              trueEntries={JSON.parse(sessionStorage.getItem("profile_sports"))}
              maxEntries={5}
              nextPageLink={"/change_profile/movies"}
            />
          }
        />

        <Route exact path="/change_profile/movies" 
          render={(props) =>
            <MoviesForm {...props}
              title={"TV/Movie Preferences"}
              entries={movieList}
              profileType={"movies"}
              trueEntries={JSON.parse(sessionStorage.getItem("profile_movies"))}
              maxEntries={4}
              nextPageLink={"/change_profile/outdoor_activities"}
            />
          }
        />

        <Route exact path="/change_profile/outdoor_activities" 
          render={(props) =>
            <OutdoorForm {...props}
              title={"Favorite Outdoor Activities"}
              entries={outdoorList}
              profileType={"outdoor"}
              trueEntries={[]}
              maxEntries={3}
              nextPageLink={"/change_profile/indoor_activities"}
            />
          }
        />

        <Route exact path="/change_profile/indoor_activities" 
          render={(props) =>
            <IndoorForm {...props}
              title={"Favorite Indoor Activities"}
              entries={indoorList}
              profileType={"indoor"}
              trueEntries={[]}
              maxEntries={3}
              nextPageLink={"/change_profile/cuisines"}
            />
          }
        />

        <Route exact path="/change_profile/cuisines" 
          render={(props) =>
            <CuisineForm {...props}
              title={"Favorite Cuisines"}
              entries={cuisineList}
              profileType={"cuisines"}
              trueEntries={[]}
              maxEntries={4}
              nextPageLink={"/change_profile/arts_and_media"}
            />
          }
        />

        <Route exact path="/change_profile/arts_and_media" 
          render={(props) =>
            <ArtsForm {...props}
              title={"Arts, Theater, and Media Activities"}
              entries={artsList}
              profileType={"arts"}
              trueEntries={[]}
              maxEntries={3}
              nextPageLink={"/change_profile"}
            />
          }
        />

        <Redirect to={sessionStorage.getItem("lastValidPage")}/>
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