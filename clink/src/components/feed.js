import React from 'react';
import './feed.css';

async function makeMessagesRequest() {
    var usernameObj = { email: sessionStorage.getItem("username") };
    console.log(usernameObj);

    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(usernameObj)
    };

    try {
      const response = await fetch("http://" + sessionStorage.getItem('local-ip') + ":3000/feed", options); //change [localhost] to your local IP address
      if (!response.ok) {
        console.log(response.statusText);
        return null;
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log(error);
      return null;
    }
}

function extractListItems(list)
{
    let str = " ";
    for(let i=0; i<list.length; i++)
    {
        if(i===list.length-1) str += list[i];
        else str += list[i] + ', ';

    }
    return str;
}


function extractPersonalityItems(list)
{
    if(list.length > 1)
    {
        var mb = list[0];
        var en = list[1];

        return(
          <div>
            <p>
              <strong>Myers-Briggs:</strong>
              {(mb !== "NoneMB") ? " " + mb : ""}
            </p>
            <p>
              <strong>Enneagram:</strong>
              {(en !== "NoneEn") ? " " + en : ""}
            </p>
          </div>
        );
    }

    return(
      <div>
            <p>
              <strong>Myers-Briggs:</strong>
            </p>
            <p>
              <strong>Enneagram:</strong>
            </p>
          </div>
    );
}


function extractPersonalInfoItems(list)
{
  if(list.length > 2)
    {
        var schoolYear = list[0];
        var religion = list[1];
        var gender = list[2];

        if(gender === "N/S") gender = "Not specified in list";

        return(
          <div>
            <p>
              <strong>School Year:</strong>
              {(schoolYear !== "NoneYear") ? " " + schoolYear : ""}
            </p>
            <p>
              <strong>Religion:</strong>
              {(religion !== "NoneReligion") ? " " + religion : ""}
            </p>
            <p>
              <strong>Gender:</strong>
              {(gender !== "NoneGender") ? " " + gender : ""}
            </p>
          </div>
        );
    }
  
    return(
      <div>
            <p>
              <strong>School Year:</strong>
            </p>
            <p>
              <strong>Religion:</strong>
            </p>
            <p>
              <strong>Gender:</strong>
            </p>
          </div>
    );
}

class FeedPage extends React.Component
{
    constructor()
    {
        super();
        sessionStorage.setItem("lastValidPage", "/feed");
        this.state = { valid: false, finishedFetch: false, userSports: [], userMovies: [],
                       userOutdoor: [], userIndoor: [], userCuisines: [], userArts: [],
                       userPersonality: [], userPersonalInfo: [], userBio:""};

        this.getNewUser = this.getNewUser.bind(this);
        this.getMatchedUser = this.getMatchedUser.bind(this);
    }

    componentDidMount()
    {
        this.getNewUser();
    }

    getNewUser()
    {
        var matchedUser = makeMessagesRequest(); //returns a promise

        const self = this;

        matchedUser.then(function (receivedUser) {
            console.log(receivedUser);
            if(receivedUser != null)
            {
                self.setState({ valid: true, finishedFetch: true,
                                userSports: receivedUser.profile.sports,
                                userMovies: receivedUser.profile.movies,
                                userOutdoor: receivedUser.profile.outdoor,
                                userIndoor: receivedUser.profile.Indoor,
                                userCuisines: receivedUser.profile.cuisines,
                                userArts: receivedUser.profile.arts,
                                userPersonality: receivedUser.profile.personality,
                                userPersonalInfo: receivedUser.profile.personalInfo,
                                userBio: receivedUser.profile.bio
                });
            }
            else
            {
                self.setState({ finishedFetch: true });
            }
        });
    }

    getMatchedUser()
    {
        if(!this.state.finishedFetch)
        {
            return(
                <p>Wait one second while we get your match...</p>
            );
        }
        else if(!this.state.valid)
        {
            return(
                <p className="about-page-para">
                    It looks like you don't currently have any other matched users.
                    Go to the Search page to find more users!
                </p>
            );
        }
        else
        {
            return(
                <div>
                <p>{this.state.userSports}</p>
                <p>{this.state.userMovies}</p>
                <p>{this.state.userOutdoor}</p>
                <p>{this.state.userIndoor}</p>
                <p>{this.state.userCuisines}</p>
                <p>{this.state.userArts}</p>
                <p>{this.state.userPersonality}</p>
                <p>{this.state.userPersonalInfo}</p>
                <p>{this.state.userBio}</p>
                </div>
            );
        }
    }

    render()
    {
        return(
            <div className='App'>
                <h1>Feed</h1>
                <h2>Here are the people that most match your preferences.</h2>
                <h3>Now go find some friends!</h3>

                {this.getMatchedUser()}

                
                <div id="feed-outer-box">
                    <div id="feed-stripes" />
                    
                    <div id="feed-Pers">
                        <u><h4 className="section-header">Personality</h4></u>
                        {extractPersonalityItems(JSON.parse(sessionStorage.getItem("profile_personality")))}
                    </div>
                
                    <div id="feed-Pinfo">
                        <u><h4 className="section-header">Personal Information</h4></u>
                        {extractPersonalInfoItems(JSON.parse(sessionStorage.getItem("profile_personalInfo")))}
                    </div>
                
                    <div id="feed-bio">
                        <u><h4 className="section-header">About Me</h4></u>
                        {sessionStorage.getItem("bio")}
                    </div>
                    <div id="feed-hobbies">
                        <u><h4 className="section-header">Interests</h4></u>
                        <ul id="feed-interest-list">
                            <li>
                                <strong>Sports:</strong>
                                {extractListItems(JSON.parse(sessionStorage.getItem("profile_sports")))}
                            </li>
                            <li>
                                <strong>Movies:</strong>
                                {extractListItems(JSON.parse(sessionStorage.getItem("profile_movies")))}
                            </li>
                            <li>
                                <strong>Indoor Activities:</strong>
                                {extractListItems(JSON.parse(sessionStorage.getItem("profile_indoor")))}
                            </li>
                            <li>
                                <strong>Outdoor Activities:</strong>
                                {extractListItems(JSON.parse(sessionStorage.getItem("profile_outdoor")))}
                            </li>
                            <li>
                                <strong>Types of Food:</strong>
                                {extractListItems(JSON.parse(sessionStorage.getItem("profile_cuisines")))}
                            </li>
                            <li>
                                <strong>Arts, Theater, and Media:</strong>
                                {extractListItems(JSON.parse(sessionStorage.getItem("profile_arts")))}
                            </li>
                        </ul>
                    </div>
                    
                    <div id="feed-card">
                        <h2>{sessionStorage.getItem("username")}'s Profile</h2>
                    </div>
                </div>
                
               
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <p>Hello</p>
              
                

            </div>
        );
    }
}

export default FeedPage;