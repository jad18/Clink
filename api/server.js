if(process.env.NODE_ENV !== 'production')
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

const initializePassport = require('./passport-config');
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

app.listen(3000, () => console.log("Listening on port 3000"));
