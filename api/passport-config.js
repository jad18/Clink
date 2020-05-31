
// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('./models/User');

// expose this function to our app using module.exports
module.exports = function(passport) {


    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

	/// signup code 
    passport.use('signup', new LocalStrategy({
		nameField : 'name',
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password,done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
			//console.log('meep');
            // if there are any errors, return the error
            if (err){
                return done(err);//, req.flash('signupMessage', 'That email is already taken.'));
            }
            // check to see if theres already a user with that email
            if (user) {
                return done(null, true);//, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                // if there is no user with that email
                // create the user
                var newUser            = new User();
				
				// set the user's local credentials
				newUser.name = req.body.name;
                newUser.email    = email;
                newUser.password = password;

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, false);
                });
            }

        });    

        });

	}));
	// login code
	passport.use('login', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
		console.log("at login function")
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);//, req.flash('loginMessage', 'Unknown error.'));
                
            // if no user is found, return the message
            if (!user)			
                return done(null, false);//, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
		
            // if the user is found but the password is wrong
            if (user.password !== password)//!user.validPassword(password))
                return done(null, false);//, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

	}
	));

};
