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

const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://rohanbattula:rohan12345@clinkdb-9xql0.mongodb.net/test?retryWrites=true&w=majority'
MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        // ...
        console.log('Connected to Database')
        const db = client.db('user-list')
        const users = db.collection('users')

        //Creating a user using the Register page: password gets encrypted
        app.post('/register', checkNotAuthenticated, (req, res, err) => {
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
    .catch(console.error)

//  prelim match-making functionality
//  IMPORTANT ASSUMPTION:
//      - assuming that there exists a global MongoClient instance called 'client' that's connected
//  Set the 'candidates' property in the user document in MDB to an array containing the usernames
//  of candidates matches. (Elements closer to the front of the array indicates closer match)
const matchAlg = (userJSON) => {
    // will contain all the users in the database
    const userCollection = client.db('user-list').collection('users').find({}).toArray();
    // fetch searcher's document
    let user = fetchUserDocument(userJSON);
    
    // probably have to do some handling if user is null

    // assigning a rating to each username
    for (var j = 0; j < userCollection.length(); j++) {
        ratings.push(
            {
                'rating': calculateUserSimilarity(user, userCollection[j]),
                'username': userCollection[j].username
            }
        );
    }
    // try to sort based on ascending rating
    ratings.sort(function (a, b) {
        return b['rating'] - a['rating'];
    });

    let candidates = [];
    ratings.foreach(element => {
        // you can't be matched with yourself or someone you've been matched with before
        if (element['username'] !== user.username && user['matchHistory'].includes(element['username']) /* see if the user had been matched before */) {
            candidates.push(element['username']);
        }
    });
    //update the candidate property in the database
    client.db('user-list').collection('users').updateOne(
        { username: user.username },
        {
            $set: { 'candidates': candidates }
        }
    );
};

const fetchUserDocument = (userJSON) => {
    let user = client.db('user-list').collection('users').find({ username: userJSON.username }).toArray();
    if (user.length() === 1) { // there should only be one match
        return user[0];
    } else {
        console.log(user); // debug use
        return null;
    }
};

/*
    Given users userOne and userTwo, return the fraction of similar
    properties between the two. If divided by zero, return -1.
    If the property is a string, 'similar' equals strings equality.
    If the property is a number, 'similar' is still undefined
 */
// TODO: fill in irrelevantProp, handle the case if a property is an array
const calculateUserSimilarity = (userOne, userTwo) => {
    let similarity = 0;
    for (var key in userOne) {
        // insert list of irrelevant properties (like username and password)
        var irrelevantProp = ['username', 'password', 'previous_matches', 'candidates'];
        if (irrelevantProp.contains(key)) {
            continue;
        }
        // both users have to have the property and they have to be the same type
        if (userTwo.hasOwnProperty(key) && typeof (userTwo[key]) === typeof (userOne[key])) {
            if (typeof (userOne[key]) === 'string') {
                if (userOne[key].trim().toLowerCase() === userTwo[key].trim().toLowerCase()) {
                    similarity += 1;
                }
            } else if (typeof (userOne[key]) === 'number') {
                // similar number properties definition to be placed here
            }
        }
    }
    return similarity;
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
        if (err) { res.json(err); }
        else if (!user) { console.log("Not valid user"); res.json({ status: false, profile: null }); }
        else {
            console.log(user); res.json({
                status: true, profile: {
                    sports: ['Soccer', 'Volleyball'], movies: [], outdoor: [],
                    indoor: [], cuisines: [], arts: []
                }
            });
        }
    })(req, res, next);
});

app.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('tempregister.ejs');
});

//Creating a user using the Register page: password gets encrypted
app.post('/signup', checkNotAuthenticated, async (req, res) => {
    try {

        let hasFoundMatch = false;
        for (let i = 0; i < users.length; i++) {
            if (req.body.username === users[i].username) {
                hasFoundMatch = true;
                break;
            }
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

// TODO: check comment
app.post('/search', (req, res) => {
    console.log("Finding a match");
    console.log(req.body);
    //matchAlg(userJSON)
    // where userJSON is a Javascript object containing the searcher's username
    res.json(true);
})

/*
    Send a JSON containing the relevant info of the matched user
    If there isn't an eligible user, the JSON contains null.
 */
// TODO: 
//  - make sure userJSON contains the Javascript object containing the searcher's username
//  - make sure userOfInterest only contains the properties safe to be sent to the frontend
app.get('/feed', (req, res) => {
    const userJSON = null;
    let user = fetchUserDocument(userJSON);
    if (user.hasOwnProperty('candidates') && user['candidates'].isArray()){ // if candidates isn't an array, something is wrong.
        let candidates = user['candidates'];
        if (candidates.length() > 0){
            let userOfInterestUsername = candidates.shift(); // get the first candidate
            let matchHistory;
            if (user.hasOwnProperty('matchHistory')){
                matchHistory = user['matchHistory'];
            }else{
                matchHistory = [];
            }
            // include this match in the match history
            matchHistory.push(userOfInterestUsername);
            // update the candidates and match history properties in the database
            client.db('user-list').collection('users').updateOne(
                { username: user.username },
                {
                    $set: { 'candidates': candidates, 'matchHistory': matchHistory}
                }
            );
            let responseJSON = fetchUserDocument(userOfInterestUsername);
            delete responseJSON['password']; // or delete some other sensitive info
            res.json(responseJSON);
        }
    }
    res.json(null);
});

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

        //app.get('/feed', )

        app.get('/messages', (req, res) => {
            let body = req.body;
            console.log(body);
            res.json(['user1', 'user2', 'user3', 'user4']);
        })

        app.delete('/logout', (req, res) => {
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
        const addUser = ({ id, name, room }) => {
            const m_user = { id, name, room };
            messageUsers.push(m_user);
            return { m_user };
        }

        const removeUser = (id) => {
            const index = messageUsers.findIndex((m_user) => m_user.id === id);
            if (index !== -1)
                return users.splice(index, 1)[0];
        }

        const getUser = (id) => messageUsers.find((m_user) => m_user.id === id);

        //use of node library socket.io
        //this is connecting a specific user to the socket
        io.on('connect', (socket) => {
            socket.on('join', ({ name, room }, callback) => {
                addUser({ id: socket.id, name, room });
                socket.join("clink");
                callback();
            });

            //when a user sends a message, the socket emits to the front end so that
            //the message is displayed
            socket.on('sendMessage', (message, callback) => {
                const user = getUser(socket.id);
                io.to("clink").emit('message', { user: user.name, text: message });
                callback()
            });

            socket.on('disconnect', () => {
                removeUser(socket.id);
            });
        });

        app.listen(3000, () => console.log("Listening on port 3000"));
        server.listen(process.env.PORT || 5000, () => console.log("Server has started."));
