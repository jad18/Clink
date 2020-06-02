import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import io from "socket.io-client";
import './messages.css';

//other React components made for the messaging feature
import Text from '../text';
import Input from '../input';
import ChatBar from '../chat_bar';
let socket;

//Using the React useState hook, we can declare a set of variable +
//setter function pairs
  const MessagesPage = ({location}) => { 
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';

  //the useEffect hook is a compressed form of componentDidMount,
  //componentDidUpdate, and componentWillUnmount
    useEffect(() => {
	//this statement parses the messages page  api to get the username and
	//room name that the messages will be writing to
    const { name, room } = queryString.parse(location.search);
    //sets the socket to read from the server port
    socket = io(ENDPOINT);

	setRoom(room);
	setName(name);
	//matching socket emit functions to write to front end, communicates
	//with the socket actions on the server.js backend
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
      //structure of the front end. Text is the component that renders the
      //messages and text bubbles, input renders the user input line.
    return (
	    <div className="App">
	    <h1>Messages</h1>
	    <div className="outerContainer">
	    <div className="container">
	    <ChatBar room={room} />
	    <Text messages={messages} name={name} />
	    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
	    </div>
	    </div>

      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

	    <Link to="/messages_home">
	    <button className="link-button2">Back to All Messages</button>
	    </Link>

      <br/><br/>
	    </div>
    );
}

export default MessagesPage;
