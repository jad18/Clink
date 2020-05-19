const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
// takes in function getUserByUsername and getUserByPassword
function initialize(passport, getUserByUsername/*, getUserById*/) {
	const authenticateUser = async (username, password, done) => {
		console.log(username, password);
		const user = getUserByUsername(username); //calls getUserByUsername for the username
		if (user == null) {
			return done(null, false, { message: 'No user with that username' });
		}
		try {
			if (password === user.password) {
				return done(null, user);
			}
			else {
				return done(null, false, { message: 'Password incorrect' });
			}
		}
		catch (e) {
			return done(e);
		}

	}
	passport.use(new LocalStrategy(authenticateUser));
	passport.serializeUser((user, done) => done(null, user.username));
	passport.deserializeUser((username, done) => {
		done(null, getUserByUsername(username));
	});
}


module.exports = initialize;
