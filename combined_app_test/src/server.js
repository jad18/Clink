import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes.js';
import NotFoundPage from './components/NotFoundPage';

const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});












/*if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const server = http.createServer(app);
const io = socketio(server);

const initializePassport = require('../passport-config');
initializePassport(passport,
		   username => users.find(user => user.username === username),
		   id => users.find(user => user.id === id)
		  );

const users = []  //should connect to a database for storage in final product

app.set('view-engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get('/', checkAuthentication, (req, res) =>
	{
	    res.render('temphomescreen.ejs');
	});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('templogin.ejs');
});

app.post('/login', checkNotAuthenticated, function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        console.log('got here');
        console.log(user, err);
    
        if(err) { res.json(err); }
        else if(!user) { console.log("Not valid user"); res.json({ status: false, profile: null }); }
        else { console.log(user); res.json({status: true, profile: {sports: ['Soccer', 'Volleyball'], movies:[], outdoor:[],
                                                                    indoor:[], cuisines:[], arts:[]}}); }
    }) (req, res, next);
});

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('tempregister.ejs');
});

//Creating a user using the Register page: password gets encrypted
app.post('/register', checkNotAuthenticated, async (req, res) => {
    try
    {
    
    let hasFoundMatch = false;
    for(let i=0; i<users.length; i++)
    {
        if(req.body.username === users[i].username)
        {
            hasFoundMatch = true;
            break;
        }
    }

    if(hasFoundMatch) res.json(false);
    else
    {  
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
	    users.push({
	        id: Date.now().toString(),
	        name: req.body.name,
	        username: req.body.username,
	        password: hashedPassword
        });
        res.json(true);
    }
    }
    catch
    {
	res.json(null);
    }	
});

app.delete('/logout', (req,res) => {
    req.logOut();
    res.redirect('login');
})

function checkAuthentication(req, res, next)
{
    if(req.isAuthenticated())
    {
	return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req,res,next)
{
    if(req.isAuthenticated())
    {
	return res.redirect('/');
    }
    next();
}

//this is to track the users that are present in the messaging room
const messageUsers = [];

//helper functions
const addUser = ({id, name, room}) => {
    const m_user = {id, name, room};
    messageUsers.push(m_user);
    return {m_user};
}

const removeUser = (id) => {
    const index = messageUsers.findIndex((m_user) => m_user.id === id);
    if(index !== -1)
	return users.splice(index, 1)[0];
}

const getUser = (id) => messageUsers.find((m_user) => m_user.id === id);

//use of node library socket.io
//this is connecting a specific user to the socket
io.on('connect', (socket) => {
    socket.on('join', ({name, room}, callback) => {
	addUser({id: socket.id, name, room});
	socket.join("clink");
	callback();
    });

    //when a user sends a message, the socket emits to the front end so that
    //the message is displayed
    socket.on('sendMessage', (message, callback) => {
	const user = getUser(socket.id);
	io.to("clink").emit('message', {user: user.name, text: message});
	callback()
    });

    socket.on('disconnect', () => {
	removeUser(socket.id);
    });
});

app.listen(3000, () => console.log("Listening on port 3000"));
server.listen(process.env.PORT || 5000, () => console.log("Server has started."));
*/