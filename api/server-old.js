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
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const server = http.createServer(app);
const io = socketio(server);

const initializePassport = require('./passport-config');
initializePassport(passport,
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
);


///////////////////
// Delete later**********************
//////////////////
const users = [];
//////////////////
//End
/////////////////

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
app.use(cors());

// DATABASE SETUP 

/*
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://rohanbattula:rohan12345@clinkdb-9xql0.mongodb.net/test?retryWrites=true&w=majority'
MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        // ...
        console.log('Connected to Database')
        const db = client.db('user-list')
        const users = db.collection('users')

        //Creating a user using the Signup page: password gets encrypted
        app.post('/signup', checkNotAuthenticated, (req, res, err) => { //Note: changed /register to /signup
            try {

                let hasFoundMatch = false;
                db.collection('users').find().toArray(function (err, result) {
                    for (var i = 0; i < result.length; i++) {
                        var obj = result[i];
                        if (req.body.email === obj.username) {
                            hasFoundMatch = true;
                            break;
                        }
                    }
                })

                if (hasFoundMatch) res.json(false);
                else {
                    const hashedPassword = bcrypt.hash(req.body.password, 10);
                    users.insertOne({
                        name: req.body.name,
                        username: req.body.email,
                        password: hashedPassword
                    });

                    console.log('true');
                    res.redirect('/');
                }
            }
            catch
            {
                console.log(err);
                res.redirect('/');
            }
        });
    })
    .catch(console.error) */

//  prelim match-making functionality
//  IMPORTANT ASSUMPTIONS:
//      - assuming that there exists a MongoClient instance called 'client' that's connected
//      - assuming that the user parameter contains the current user's mongoDB document
//  Without the above this wouldn't work
//  Returns array containing the usernames (or some functionally equivalent unique identifier)
//  of candidates matches. (Elements closer to the front of the array indicates closer match)
/*const matchAlg = (user) => {
    const userCollection = client.db('user-list').collection('users').find({}).toArray();
    // assigning a rating to each username
    for (var j = 0; j < userCollection.length; j++) {
        ratings.push(
            {
                'rating': calculateUserSimilarity(userCollection[i], userCollection[j]),
                // TODO:
                // assuming the user has a username property
                // if not, use some unique identifier
                'username': userCollection[j].username
            }
        );
    }
    // try to sort based on ascending rating
    ratings.sort(function (a, b) {
        return b['rating'] - a['rating'];
    });

    // TODO: need some fill in the blank action. Read comments.
    let candidates = [];
    ratings.foreach(element => {
        // you can't be matched with yourself or someone you've been matched with before
        // negative rating means something went wrong. Check calculate User Similarity
        if (element['username'] !== user.username *//* or again some unique identifier *//*
            && true /* see if the user had been matched before *//*
            && element['rating'] >= 0){
                candidates.push(element['username']); // some unique identifier
            }
    });
    return candidates;
};*/

/*
    Given users userOne and userTwo, return the fraction of similar
    properties between the two. If divided by zero, return -1.
    If the property is a string, 'similar' equals strings equality.
    If the property is a number, 'similar' is still undefined
 */
const calculateUserSimilarity = (userOne, userTwo) => {
    let similarity = 0, totalProperties = 0;
    for (var key in userOne) {
        // insert list of irrelevant properties (like username and password)
        var irrelevantProp = [];
        if (irrelevantProp.contains(key)) {
            continue;
        }
        // both users have to have the property and they have to be the same type
        if (Object.prototype.hasOwnProperty(userTwo, key) && typeof (userTwo[key]) === typeof (userOne[key])) {
            if (typeof (userOne[key]) === 'string') {
                if (userOne[key].trim().toLowerCase() === userTwo[key].trim().toLowerCase()) {
                    similarity += 1;
                }
            } else if (typeof (userOne[key]) === 'number') {
                // similar number properties definition to be placed here
            }
            totalProperties += 1;
        }
    }
    if (totalProperties === 0) {
        return -1;
    } else {
        return similarity / totalProperties;
    }
};

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get('/', checkAuthentication, (req, res) => {
    res.render('temphomescreen.ejs');
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    console.log('login');
    res.render('templogin.ejs');
});


app.post('/login', checkNotAuthenticated, function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        console.log('got here');
        console.log(user, err);
        if(err) { res.json(err); }
        else if(!user) { console.log("Not valid user"); res.json({ status: false, profile: null }); }
        else { console.log(user); res.json({status: true, name: "Me", profile: {sports: ['Soccer', 'Volleyball'], movies:[], outdoor:[],
                                                                    indoor:[], cuisines:[], arts:[],
                                                                    personality:['NoneMB', 'NoneEn'],
                                                                    personalInfo:['NoneYear', 'NoneReligion'], bio:""}}); }
    }) (req, res, next);
});

app.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('tempregister.ejs');
});

//Creating a user using the Register page: password gets encrypted
app.post('/signup', checkNotAuthenticated, async (req, res) => {
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



app.post('/change_profile', (req, res) => {
    console.log("Getting profile change request");
    console.log(req.body);
    //store this info
    res.json(true);
})


app.post('/search', (req, res) => {
    console.log("Finding a match");
    console.log(req.body);
    //your search algorithm
    res.json(true);
})

//app.get('/feed', )

app.get('/messages', (req, res) => {
    let body = req.body;
    console.log(body);
    res.json(['user1', 'user2', 'user3', 'user4']);
})

app.delete('/logout', (req,res) => {
    req.logOut();
    res.redirect('login');
})

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
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
