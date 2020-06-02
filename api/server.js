const express = require("express");
const session = require("express-session");
const app = express();

const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash    = require('connect-flash');
const user = require('./models/User')

const methodOverride = require('method-override');
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

const cors = require('cors');
app.use(cors());


const PORT = 5000;
var bodyParser = require("body-parser");

// mongodb connection string, this is differnet for different people so will not work on your computer 
//const url= 'mongodb+srv://rohanbattula:rohan12345@clinkdb-9xql0.mongodb.net/user-list?retryWrites=true&w=majority'

const url = "mongodb+srv://rohanbattula:rohan12345@clinkdb-9xql0.mongodb.net/test?retryWrites=true&w=majority"


// mongoose connection 
mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})


app.set('view-engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: false
}));


app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes.js')(app, passport, user); // load our routes and pass in our app and fully configured passport
require('./passport-config')(passport);



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}


///////////////////////
// Messages
///////////////////////

//this is to track the users that are present in the messaging room
const messageUsers = [];
const users = [];
const roomsList = {"test1 test3": ["test1", "This is the first text", "test3", "This is the second text"],
                    "test1 test5" :["test5", "How's everything going for you?"]};
//helper functions
const addUser = ({id, name, room}) => {
    const m_user = {id, name, room};
    messageUsers.push(m_user);
    return m_user;
}
const removeUser = (id) => {
    const index = messageUsers.findIndex((m_user) => m_user.id === id);
    if(index !== -1)
	return messageUsers.splice(index, 1)[0];
}
const getUser = (id) => messageUsers.find((m_user) => m_user.id === id);
//use of node library socket.io
//this is connecting a specific user to the socket
io.on('connect', (socket) => {
    socket.on('join', ({name, room}, callback) => {
	const user = addUser({id: socket.id, name, room});
    socket.join(user.room);

    console.log(user.room);

    var chatList = roomsList[user.room];
    if(chatList)
    {
        for(let i=0; (i+1)<chatList.length; i+=2)
        {
            socket.emit('message', {user: chatList[i], text: chatList[i+1]});
        }
    }
    else
    {
        roomsList[user.room] = [];
    }

	callback();
    });
    //when a user sends a message, the socket emits to the front end so that
    //the message is displayed
    socket.on('sendMessage', (message, callback) => {
	const user = getUser(socket.id);
    io.to(user.room).emit('message', {user: user.name, text: message});

    //Safety measure
    if(!roomsList[user.room])
    {
        roomsList[user.room] = [];
    }
    roomsList[user.room].push(user.name);
    roomsList[user.room].push(message);
	callback();
    });
    socket.on('disconnect', () => {
	removeUser(socket.id);
    });
});

app.listen(3000, () => console.log("Listening on port 3000"));
server.listen(process.env.PORT || 5000, () => console.log("Server has started."));

