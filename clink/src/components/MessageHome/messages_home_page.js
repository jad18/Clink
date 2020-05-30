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
      const response = await fetch("http://[localhost]:3000/messages", options); //change [localhost] to your local IP address
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

        this.state = { messages: {}, finishedFetch: false }

        this.getMessages = this.getMessages.bind(this);
        this.getTableEntries = this.getTableEntries.bind(this);
        this.makeMessageEntry = this.makeMessageEntry.bind(this);
    }

    componentDidMount()
    {
        var messagesResult = makeMessagesRequest(); //returns a promise
        const self = this;
        messagesResult.then(function (result) {
            self.setState({ messages: result, finishedFetch: true });   //Note: will return an error if messages is null
        });
    }

    makeMessageEntry(username, isNew)
    {
        const alignmentTool = (isNew ? <span className="alignment-tool"/> : null);
        console.log(String(isNew) + " " + username);
        return(
            <tr className="messages-table-row">
                <Link to={`/messages?name=${sessionStorage.getItem("username")}&room=${getRoomName(username)}`}>
                    <td className={isNew ? "new-table-column" : "old-table-column"}>
                        <button className="messages-link-button">
                            {String(isNew)} {username} {alignmentTool}
                        </button>
                    </td>
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
                <br/>
            </div>
        );
    }
}

export default MessagesHome;