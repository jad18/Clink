const ​express = ​require​(​"express"​);
const session = require('express-session'); // so user can stay logged in
const ​app = express();

app.use(express.urlencoded({extended: false})); // so the json won't be sent through the URL

app.​get​(​"/"​, (req, res) =>{
  ​// TODO
​  res.​send​(​"Hello, world!"​); 
});

app.​listen​(​3000​, () => { ​
  console​.​log​(​"Listening on port 3000!"​);
});