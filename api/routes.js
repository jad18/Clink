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

    
    /*app.post('/signup', //function(req, res, next) {
        passport.authenticate('signup'), function(req, res)
        {
          res.json(true);
        }
    );*/

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

      app.post('/feed', (req, res) => {
        // Note: you must send a user in this form (should get rid of other information, and at least must
        // have the following entries):
        const user = { profile: {sports: ['Soccer', 'Volleyball'], movies:[], outdoor:[], indoor:[], cuisines:[],
                        arts:[], personality:['NoneMB', 'NoneEn'], personalInfo:['NoneYear', 'NoneReligion'], bio:"f"}};
        res.json(user);
    })
    
    app.post('/messages', (req, res) => {
        let usernameObj = req.body; //body only contains the username of the user
        console.log(usernameObj);
        let messages = {"user1": false, "user2": false, "user3": true, "user4": true, "user5": false};
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