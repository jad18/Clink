import React from 'react';
import './feed.css';
import {Link} from 'react-router-dom';

async function makeMessagesRequest(isNew) {
    var reqObj = { email: sessionStorage.getItem("username"), getNewUser: isNew };
    console.log(reqObj);

    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(reqObj)
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
                       userPersonality: [], userPersonalInfo: [], userBio:"",
                       userUsername: "" };

        this.getUser = this.getUser.bind(this);
        this.getMatchedUser = this.getMatchedUser.bind(this);
    }

    componentDidMount()
    {
        this.getUser(false);
    }

    getUser(getNewUser)
    {
        var matchedUser = makeMessagesRequest(getNewUser); //returns a promise

        const self = this;

        matchedUser.then(function (receivedUser) {
            console.log("user:", receivedUser);
            if(receivedUser != null)
            {
                console.log(receivedUser.profile.sports);
                self.setState({ valid: true, finishedFetch: true,
                                userSports: receivedUser.profile.sports,
                                userMovies: receivedUser.profile.movies,
                                userOutdoor: receivedUser.profile.outdoor,
                                userIndoor: receivedUser.profile.indoor,
                                userCuisines: receivedUser.profile.cuisines,
                                userArts: receivedUser.profile.arts,
                                userPersonality: receivedUser.profile.personality,
                                userPersonalInfo: receivedUser.profile.personalInfo,
                                userBio: receivedUser.profile.bio,
                                userUsername: receivedUser.email
                });
            }
            else
            {
                self.setState({ finishedFetch: true, valid: false });
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
                <div id="feed-outer-box">
                    <div id="feed-stripes" />
                    
                    <div id="feed-Pers">
                        <u><h4 className="section-header">Personality</h4></u>
                        {extractPersonalityItems(this.state.userPersonality)}
                    </div>
                
                    <div id="feed-Pinfo">
                        <u><h4 className="section-header">Personal Information</h4></u>
                        {extractPersonalInfoItems(this.state.userPersonalInfo)}
                    </div>
                
                    <div id="feed-bio">
                        <u><h4 className="section-header">About Me</h4></u>
                        {this.state.userBio}
                    </div>
                    <div id="feed-hobbies">
                        <u><h4 className="section-header">Interests</h4></u>
                        <ul id="feed-interest-list">
                            <li>
                                <strong>Sports:</strong>
                                {extractListItems(this.state.userSports)}
                            </li>
                            <li>
                                <strong>Movies:</strong>
                                {extractListItems(this.state.userMovies)}
                            </li>
                            <li>
                                <strong>Indoor Activities:</strong>
                                {extractListItems(this.state.userIndoor)}
                            </li>
                            <li>
                                <strong>Outdoor Activities:</strong>
                                {extractListItems(this.state.userOutdoor)}
                            </li>
                            <li>
                                <strong>Types of Food:</strong>
                                {extractListItems(this.state.userCuisines)}
                            </li>
                            <li>
                                <strong>Arts, Theater, and Media:</strong>
                                {extractListItems(this.state.userArts)}
                            </li>
                        </ul>
                    </div>
                    
                    <div id="feed-card">
                        <h2>{this.state.userUsername}'s Profile</h2>
                    </div>
                </div>
                
               
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <p className="about-page-para">
                    Be sure to take your time and consider them, you never know what they might have to say!
                    If you'd like to get in touch with them, press the 'Message This User' button. If you'd
                    rather keep looking, press the 'Get New Match' button.</p>

                <Link to="/messages_home">
                    <button className="link-button2">Message This User</button>
                </Link>
                <button className="link-button2" onClick={() => this.getUser(true)}>Get New Match</button>

                <br/><br/>
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
              
            </div>
        );
    }
}

export default FeedPage;