if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const initializePassport = require('./passport-config'); //passport-config exports a function that we will call initialize Passport
//we call the initializePassport function imported from ./passport-config
initializePassport(passport,
    function (username) { return users.find(user => user.username === username) },
    /*function(password) { users.find(user => user.password === password)}*/
);

var users = [{ username: 'admin', password: 'clinkadmin' }]  //should connect to a database for storage in final product

app.set('view-engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

//display the homescreen if the user is logged in
//else display the login screen
app.get('/', checkAuthentication, (req, res) => {
    res.render('temphomescreen.ejs');
});

// if the user is not authenticated, display the login page
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('templogin.ejs');
});

app.post('/login', checkNotAuthenticated, function (req, res, next) {
    passport.authenticate('local', function (err, user, info) { //function willl serve as done in the local strategy (passport-config)
        if (err) { 
            return req.send(err);
            //return next(err); 
        }
        if (!user) { //login failed
            console.log('login failed');
            return res.redirect('/login'); 
        }
        //login successful
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.redirect('/user/' + user.username);
        });
        /*
        //console.log(user, err);
        let username = req.body.username;
        let password = req.body.password;

        if (!databaseContainsUser(username, password)) {
            res.redirect('/login'); //maybe some other thing to inform the user that login is unsuccessful
            //res.send("can't log in try again");
        } else {
            // somehow tell the username that login is successful
            req.login(user, function (err) {
                if (err) { return next(err); }
                return res.redirect('/users/' + req.user.username);
            });
        }*/

    })(req, res, next);
});

//display the user's profile page given the username
//display the user's profile 
//only accessible if the user is authenticated (logged in)
app.get('/user/:id', checkAuthentication, (req, res) => {
    res.send('Display the webpage for user ' + req.params.id);
});

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('tempregister.ejs');
});

//Creating a user using the Register page (add a JSON representing the user into the 
//users array, which will eventually become the database)
app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        //see if username is used before
        if (databaseContainsUser(req.body.username)) {
            res.send('Username unavailable. Try something else.');
        }
        users.push({
            id: Date.now().toString(), //what's the point of this if we have an username?
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });
        res.redirect('/login');
    }
    catch
    {
        res.send('Something went wrong. Check the function handling /register post request.');
    }
});

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('login');
});

//Execute next() if authenticated.
function checkAuthentication(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/login');
    } else {
        next();
    }
}

//Exeucute next() if not authenticated.
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    } else {
        next();
    }
}

//Function used to check whether database contains a user with the username (if 
//user with username is registered)
//If password argument is supplied, this function will check whether the database contains 
//an user that has BOTH the specified username and password
//  Currently looks through the users array. Eventually need to change to looking
//  through the database.
function databaseContainsUser(username, password = null) {
    let found;
    for (let i = 0; i < users.length; i++) {
        found = false;
        if (username === users[i].username && (!password || users[i].password === password)) {
            console.log(username, users[i].username, password, users[i].password)
            found = true;
            break;
        }
    }
    return found;
}

app.listen(3000, () => console.log("Listening on port 3000"));
