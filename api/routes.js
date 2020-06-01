// all our APIs
module.exports = function(app,passport){


    app.get('/signup', (req, res) => {
        res.render('tempregister.ejs', { message: req.flash('signupMessage') });
      });
      
    app.get('/', (req, res) => {
        res.render('temphomescreen.ejs');
      });

    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('temphomescreen.ejs', { user: req.user });
      });
    app.get('/login',(req, res) => {
        res.render('templogin.ejs',  { message: req.flash('loginMessage') });
      });


    app.post('/signup', function (req, res, next) {
      passport.authenticate('signup', function (err, user, info)
      {
          console.log('got here');
          console.log(user, err);
          if(err) res.json(null);

          else if(user) res.json(false);

          else
          {
            res.json(true);
          }
      }) (req, res, next);
    });
    
         
    app.post('/login', function (req, res, next) {
      passport.authenticate('login', function (err, user)
      {
          console.log('got here');
          console.log(user, err);
          if(err) res.json(err);

          else if(!user) res.json({ status: false, profile: null });

          else
          {
            console.log(user);
            let tempUser = JSON.parse(JSON.stringify(user));
            console.log(tempUser);

            res.json({status: true, name: "Me", profile: {sports: ['Soccer', 'Volleyball'], movies:[], outdoor:[],
                                                                          indoor:[], cuisines:[], arts:[],
                                                                          personality:['NoneMB', 'NoneEn'],
                                                                          personalInfo:['NoneYear', 'NoneReligion'], bio:""}});
          }
      }) (req, res, next);
    });

    app.post('/change_profile', (req, res) => {
        //req.body will be in the form: { email: "username_here", section: "section_here", list: "list_here"}
        //The section is the area/section from the profile that the user wants to change (sports, movies, etc.),
        //and the list is the full list that the user wants to submit. You can replace the old list with this
        //new list, no other work required. Return true/false if successful, mostly should be true

        console.log("Getting profile change request");
        console.log(req.body);
        //store this info
        res.json(true);
    })
    
    
    app.post('/search', (req, res) => {
        //req.body contains an object with the user's email and a variable set of key-value pairs for each section
        //that the user wanted to look in and the values for that section. For example, one object could be:
        //{email: "username_here", sports: ['Baseball', 'Football'], arts: ['Video Editing']}
        //You will never receive an empty list, so you will not have to check for this
        console.log("Finding a match");
        console.log(req.body);
        //your search algorithm

        //You must return true if a match is found and false if not. Jeremy and I (Jackson) agreed on having the server
        //store a list of matched users in the database as an attribute for a user, and the feed page will request
        //a user from that list. But here nothing more needs to be done
        res.json(true);
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
        var user;
        if(true)
          user = { email: "hi", profile: {sports: ['Soccer', 'Volleyball'], movies:[], outdoor:[], indoor:[], cuisines:[],
                        arts:[], personality:['NoneMB', 'NoneEn'], personalInfo:['NoneYear', 'NoneReligion'], bio:"f"}};
        else user = null;

        res.json(user);
    })
    
    app.post('/messages', (req, res) => {
        //req.body is in the form: { email: "username_here"}
        //Must send back object of users with true/false values for whether or not there is a new message
        //(true means new message, false means not). Order does not matter unless you want it too, in which
        //case put the newest messages first and the older messages later

        let usernameObj = req.body; //body only contains the username of the user
        console.log(usernameObj);
        let messages = {"user1": false, "user2": false, "user3": true, "user4": true, "user5": false, "hi": true, "test1": false};
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
}