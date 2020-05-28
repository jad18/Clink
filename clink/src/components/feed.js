import React from 'react';
import './profile.css';

class FeedPage extends React.Component
{
    constructor()
    {
        super();
        sessionStorage.setItem("lastValidPage", "/feed");
    }

    render()
    {
        return(
            <div className='App'>
                <h2>Here are the people that most match your preferences.</h2>
                <h3>Now go find some friends!</h3>
                <p>The feed will go here.</p>
                <span>
                    <div className='profile-card-box'>
                    <p>Username</p>
                    <p>This is cool</p>
                    </div>
                </span>

            </div>
        );
    }
}

export default FeedPage;