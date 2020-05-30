import React from 'react';
import './profile.css';

async function makeMessagesRequest() {
    var usernameObj = { username: sessionStorage.getItem("username") };
    console.log(usernameObj);

    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(usernameObj)
    };

    try {
      const response = await fetch("http://[localhost]:3000/feed", options); //change [localhost] to your local IP address
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
                <h2>Here are the people that most match your preferences.</h2>
                <h3>Now go find some friends!</h3>
                <p>The feed will go here.</p>

                {this.getMatchedUser()}
                

            </div>
        );
    }
}

export default FeedPage;