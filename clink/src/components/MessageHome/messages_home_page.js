import React from 'react';
import './messages_home.css';

function isNew(username, newMessageUsers)
{
    for(let i=0; i<newMessageUsers.length; i++)
    {
        if(username === newMessageUsers[i]) return true;
    }
    return false;
}

class MessagesHome extends React.Component
{
    constructor()
    {
        super();

        sessionStorage.setItem("lastValidPage", '/messages_home');

        let newMessageUsers = ['user1', 'user2'];
        let allMessageUsers = ['user1', 'user2', 'user3', 'user4', 'user5'];

        this.state = {
            messages: allMessageUsers.reduce(
                (prevUsers, curUser) =>
                ({
                    ...prevUsers,
                    [curUser]: isNew(curUser, newMessageUsers)
                }),
                {},
            ),
            numNewUsers: newMessageUsers.length,
            numTotalUsers: allMessageUsers.length
        }

        console.log(this.state.messages);

        this.getMessages = this.getMessages.bind(this);
        this.getUserTableEntries = this.getUserTableEntries.bind(this);
        this.makeNewMessageEntry = this.makeNewMessageEntry.bind(this);
        this.makeOldMessageEntry = this.makeOldMessageEntry.bind(this);
    }

    makeNewMessageEntry(username)
    {
        console.log("new: " + username);
        return(
            <tr>
                <td className="new-table-column">{username}</td>
            </tr>
        );
    }

    makeOldMessageEntry(username)
    {
        console.log("old: ", username);
        return(
            <tr>
                <td className="old-table-column">{username}</td>
            </tr>
        );
    }

    getUserTableEntries()
    {
        return(
            Object.keys(this.state.messages).map(function(user)
            {
                return (this.state.messages[user] ? this.makeNewMessageEntry(user) : this.makeOldMessageEntry(user));
            }, this)
        );
    }

    getMessages()
    {
        if(this.state.numTotalUsers=== 0)
        {
            return(
                <div>
                    <p>You don't have any messages yet :(</p>
                    <p>Reach out to other people by going to the search tab!</p>
                </div>
            );
        }
        else
        {
            return(
                <table id='main-messages-table'>
                    <tbody>
                        {this.getUserTableEntries()}
                    </tbody>
                </table>
            );
        }
    }

    render()
    {
        return(
            <div className="App">
                <h1>Messages</h1>
                {this.getMessages()}
            </div>
        );
    }
}

export default MessagesHome;