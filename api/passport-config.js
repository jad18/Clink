
module.exports = function(passport){

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	  });
	  
	passport.deserializeUser(function(id, done) {
		User.findById(id, function (err, user) {
		  done(err, user);
		});
	  });

	passport.use(new LocalStrategy(
		function(username, password, done) {
		  User.findOne({ username: username }, function (err, user) {
			if (err) { return done(err); }
			if (!user) { return done(null, false); }
			if (!user.verifyPassword(password)) { return done(null, false); }
			return done(null, user);
		  });
		}
	  ));
	
}
/*
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
function initialize(passport, getUserByUsername, getUserById)
{
    const authenticateUser = async (username, password, done) =>
	  {
	      const user = getUserByUsername(username);
	      if(user == null)
	      {
		  return done(null,false, {message:'No user with that username'});
	      }
	      try
	      {
		  if(await bcrypt.compare(password, user.password))
		  {
		      return done(null,user);
		  }
		  else
		  {
		      return done(null,false, {message: 'Password incorrect'});
		  }
	      }
	      catch(e)
	      {
		  return done(e);
	      }
	      
	  }
    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id,done) => {
	return done(null, getUserById(id));
    });
 }


module.exports = initialize;
*/