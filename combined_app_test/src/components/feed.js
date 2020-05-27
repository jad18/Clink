import React from 'react';

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
            </div>
        );
    }
}

export default FeedPage;