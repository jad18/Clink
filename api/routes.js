// all our APIs
var User = require('./models/User');

module.exports = function (app, passport, mongooseModel) {


  app.get('/signup', (req, res) => {
    res.render('tempregister.ejs', { message: req.flash('signupMessage') });
  });

  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('temphomescreen.ejs', { user: req.user });
  });

  app.get('/login', (req, res) => {
    res.render('templogin.ejs', { message: req.flash('loginMessage') });
  });



  app.post('/signup', function (req, res, next) {
    passport.authenticate('signup', function (err, user, info) {
      console.log('got here');
      console.log(user, err);
      if (err) res.json(null);

      else if (user) res.json(false);

      else {
        res.json(true);
      }
    })(req, res, next);
  });


  app.post('/login', function (req, res, next) {
    passport.authenticate('login', function (err, user) {
      console.log('got here');
      console.log(user, err);
      if (err) res.json(err);

      else if (!user) res.json({ status: false, profile: null });

      else {
        console.log(user);
        let tempUser = JSON.parse(JSON.stringify(user));
        console.log(tempUser);

        res.json({
          status: true, name: "Me", profile: {
            sports: ['Soccer', 'Volleyball'], movies: [], outdoor: [],
            indoor: [], cuisines: [], arts: [],
            personality: ['NoneMB', 'NoneEn'],
            personalInfo: ['NoneYear', 'NoneReligion'], bio: ""
          }
        });
      }
    })(req, res, next);
  });


  app.post('/search', (req, res) => {
    //req.body contains an object with the user's email and a variable set of key-value pairs for each section
    //that the user wanted to look in and the values for that section. For example, one object could be:
    //{email: "username_here", sports: ['Baseball', 'Football'], arts: ['Video Editing']}
    //You will never receive an empty list, so you will not have to check for this
    console.log("Finding a match");
    console.log(req.body);
    //your search algorithm
    // will contain all the users in the database
    mongooseModel.find({}, function (err, userCollection) {
      // fetch searcher's document
      let user;
      for (var i = 0; i < userCollection.length; i++) {
        //console.log(typeof userCollection[i].email);
        //console.log(userCollection[i].email);
        if (userCollection[i].email === req.body.email) {
          user = userCollection[i];
          console.log('userfound');
          break;
        }
      }
      let ratings = [];
      // probably have to do some handling if user is null

      // assigning a rating to each username
      for (var j = 0; j < userCollection.length; j++) {
        ratings.push(
          {
            'rating': calculateUserSimilarity(user, userCollection[j]),
            'email': userCollection[j].email
          }
        );
      }
      // try to sort based on ascending rating
      ratings.sort(function (a, b) {
        return b['rating'] - a['rating'];
      });
      console.log('ratings:');
      console.log(ratings);
      console.log('\n');

      let candidates = [];
      ratings.forEach(element => {
        // you can't be matched with yourself or someone you've been matched with before
        if (element['email'] && element['email'] !== user['email'] && !user['matchHistory'].includes(element['email']) /* see if the user had been matched before */) {
          candidates.push(element['email']);
        }
      });
      console.log('candidates:');
      console.log(candidates);
      console.log('\n');

      user.candidates = candidates;
      user.save();



      //update the candidate property in the database
      //You must return true if a match is found and false if not. Jeremy and I (Jackson) agreed on having the server
      //store a list of matched users in the database as an attribute for a user, and the feed page will request
      //a user from that list. But here nothing more needs to be done
      res.json(true);
    });
  })

  app.post('/feed', (req, res) => {
    //req.body is in the form: { email: "username_here", getNewUser: isNew }, where isNew is a true/false value
    //indicating whether the user wants to get the next entry in their matched list (true), or whether they
    //just want to grab the old user (one that the server has already sent) and look again at them. This means
    //that if you have an array of users, you start off at element 0 right after a search (you should keep an index
    //value as a part of the user's profile), and you only increment this number when isNew is true. In summary,
    //if isNew is true, you increment the index by 1 and give the user at that new index. If isNew is false, you
    //keep the index the same and give the user at that same index.
    // Note: if another user can be found in the next element of the you must send a user in this form (should
    //get rid of other information, and at least must have the following entries):
    //Note: if no user can be found, simply say 'res.json(null)'

    let collection = mongooseModel;
    let match;
    // retrieve all the users (very bad not scalable)
    collection.find({}, function (err, userCollection) {
      let user;
      for (var i = 0; i < userCollection.length; i++) {
        //console.log(typeof userCollection[i].email);
        //console.log(userCollection[i].email);
        if (userCollection[i].email === req.body.email) {
          user = userCollection[i];
          break;
        }
      }
      let candidates = user.candidates;
      let matchHistory = user.matchHistory;
      console.log('candidates:', candidates);
      console.log('matchHistory:', matchHistory);
      if (req.body.getNewUser) {
        console.log('getting new user');
        // pop from candidates
        if (candidates.length > 0) {
          match = candidates.shift();
          // add to matchHistory
          matchHistory.push(match);
          // make sure the changes are made to the database
          user.candidates = candidates;
          user.matchHistory = matchHistory;
          user.save();
        }
        if (candidates.length > 0) {
          match = candidates[0];
        } else {
          res.json(null);
          return;
        }
      } else {
        console.log('not new user');
        if (candidates.length > 0) {
          match = candidates[0];
        } else {
          res.json(null);
          return;
        }
      }
      console.log('match:', match);
      // match now contains the username of the match
      for (var i = 0; i < userCollection.length; i++) {
        //console.log(typeof userCollection[i].email);
        //console.log(userCollection[i].email);
        if (userCollection[i].email === match) {
          match = userCollection[i];
          break;
        }
      }
      let copyMatch = {};
      //get rid of sensitive information in match
      var profile = {};
      for (var key in match) {
        let relevantProperties = ['sports', 'movies', 'outdoor', 'indoor', 'cuisines',
          'arts', 'personality', 'personalInfo', 'bio', 'movies'];
        if (relevantProperties.includes(key)) {
          if (match[key]) {
            profile[key] = match[key];
          } else if (key === 'bio') {
            profile[key] = 'bio stuff';
          } else {
            profile[key] = [];
          }
        }
      }
      copyMatch.email = match.email;
      copyMatch.profile = profile;
      console.log(profile);
      console.log(copyMatch);
      res.json(copyMatch);
    });
  })

  app.post('/messages', (req, res) => {
    //req.body is in the form: { email: "username_here"}
    //Must send back object of users with true/false values for whether or not there is a new message
    //(true means new message, false means not). Order does not matter unless you want it too, in which
    //case put the newest messages first and the older messages later

    let usernameObj = req.body; //body only contains the username of the user
    console.log(usernameObj);
    let messages = { "user1": false, "user2": false, "user3": true, "user4": true, "user5": false };
    res.json(messages);
  })

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
  }

  const matchAlg = (userJSON) => {

  };

  const fetchUserDocument = (username) => {
    mongooseModel.findOne({ email: username }, function (err, result) {
      return result;
    });
  };

  /*
      Given users userOne and userTwo, return the fraction of similar
      properties between the two. If divided by zero, return -1.
      If the property is a string, 'similar' equals strings equality.
      If the property is a number, 'similar' is still undefined
   */
  const calculateUserSimilarity = (userOne, userTwo) => {
    //console.log(userOne);
    //console.log(userTwo);
    let similarity = 0;
    let relevantProperties = ['sports', 'outdoor', 'indoor', 'cuisines', 'arts', 'personality'];
    for (var key in userOne) {
      if (!relevantProperties.includes(key)) {
        continue;
      }
      for (let i = 0; i < userOne[key].length; i++) {
        if (userTwo[key].includes(userOne[key][i])) {
          similarity += 1;
        }
      }
    }
    return similarity;
  };


  app.post('/change_profile', (req, res) => {
    const doc = User.findOne({ username: req.body.username });
    doc.sports = req.body.sports;
    /*
    doc.movies = req.body.movies; 
    doc.outdoor= req.body.outdoor; 
    doc.indoor = req.body.indoor; 
    doc.cuisines = req.body.cuisines; 
    doc.arts = req.body.arts; 
    doc.personality = req.body.personality; 
    doc.personalInfo = req.body.personalInfo; 
    doc.bio = req.body.bio; 
    */
    doc.save();
    console.log("Getting profile change request");
    console.log(req.body);
    //store this info
    res.json(req.body);
  })

}


/*

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
*/


