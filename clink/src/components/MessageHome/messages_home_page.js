import React from 'react';
import {Link} from 'react-router-dom';
import './messages_home.css';

async function makeMessagesRequest() {
    var usernameObj = { username: sessionStorage.getItem("username") };
    console.log(usernameObj);

    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(usernameObj)
    };

    try {
      const response = await fetch("http://192.168.1.166:3000/messages", options); //change [localhost] to your local IP address
      if (!response.ok) {
        alert(response.statusText);
        return null;
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

function getRoomName(msgUsername)
{
    return sessionStorage.getItem("username") + '+' + msgUsername;
}


class MessagesHome extends React.Component
{
    constructor()
    {
        super();

        sessionStorage.setItem("lastValidPage", '/messages_home');

        var messagesResult = makeMessagesRequest(); //returns a promise

        this.state = { messages: {}, finishedFetch: false }
        const self = this;

        messagesResult.then(function (result) {
            self.setState({ messages: result, finishedFetch: true });   //Note: will return an error if messages is null
        });
    

        /*this.state = {
            numNewUsers: newMessageUsers.length,
            numTotalUsers: allMessageUsers.length
        }*/

        console.log(this.state.messages);

        this.getMessages = this.getMessages.bind(this);
        this.getTableEntries = this.getTableEntries.bind(this);
        this.makeMessageEntry = this.makeMessageEntry.bind(this);
    }

    makeMessageEntry(username, isNew)
    {
        console.log(String(isNew) + " " + username);
        return(
            <tr>
                <Link to={`/messages?name=${sessionStorage.getItem("username")}&room=${getRoomName(username)}`}>
                    <td className="new-table-column">{String(isNew)} {username}</td>
                </Link>
            </tr>
        );
    }

    getTableEntries(desiredVal)
    {
        //desiredVal is true if looking for new values, false if looking for old values
        //in this.state.messages, value of a message is true if new and false if old
        return(
            Object.keys(this.state.messages).map(function(user)
            {
                return (this.state.messages[user]===desiredVal
                    ? this.makeMessageEntry(user, desiredVal) : null);
            }, this)
        );
    }

    getMessages()
    {
        if(this.state.messages === null)
        {
            return(
                <div>
                    <p>An error occurred when contacting the server.</p>
                    <p>Please check you connection and try again.</p>
                </div>
            );
        }
        else if(this.state.finishedFetch)
        {
            if(Object.keys(this.state.messages).length === 0)
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
                            {this.getTableEntries(true)}
                            {this.getTableEntries(false)}
                        </tbody>
                    </table>
                );
            }
        }
        else return null;
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