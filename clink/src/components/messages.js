import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import io from "socket.io-client";
import '../messages.css';

import Text from './text';
import Input from './input';
let socket;

const MessagesPage = ({location}) => { 
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

      socket.emit('join', { name, room }, (error) => {
	  
      });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

    return (
	    <div className="App">
	    <h1>Messages</h1>
	    <div className="outerContainer">
	    <div className="container">
	    <Text messages={messages} name={name} />
	    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
	    </div>
	    </div>
	    <Link to="/">
	    <button className="link-button2">Back to Home </button>
	    </Link>
	    </div>
    );
}

export default MessagesPage;
