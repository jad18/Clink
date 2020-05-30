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

    app.post('/signup', 
        passport.authenticate('signup', {
          successRedirect : '/login', // redirect to the secure profile section
          failureRedirect : '/signup', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
         }));
      
    app.post('/login', 
        passport.authenticate('login', {
          successRedirect : '/profile', // redirect to the secure profile section
          failureRedirect : '/login', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));
   
      // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
            res.redirect('/login');
    }
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
*/ 