const express = require("express");
const session = require("express-session");
const flash = require('express-flash');
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const user = require('./models/User')
const app = express();
const PORT = 5000;
var session = require("express-session"),
bodyParser = require("body-parser");

const url= 'mongodb+srv://rohanbattula:rohan12345@clinkdb-9xql0.mongodb.net/user-list?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

app.set('view-engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: false
}));


app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());


function saveUser (user) {
  const c = new User(user)
  return c.save()
}


app.post('/signup', (req, res, err) => { //Note: changed /register to /signup
    saveUser(req.body)
      .then(doc => { 
        console.log(doc)
        res.redirect('/')
       })
      .catch(error => { console.error(error) })
    /*
    try {

        let hasFoundMatch = false;0

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
    */
});

app.post('/login', (req,res) => { 
  if (User.find({name: req.body.name}).count() > 0){

  }
})
app.get('/', (req, res) => {
  res.redirect('/signup');
});

app.get('/login',(req, res) => {
  console.log('login');
  res.render('templogin.ejs');
});

app.get('/signup', (req, res) => {
  res.render('tempregister.ejs');
});

app.listen(3000, () => console.log("Listening on port 3000"));

