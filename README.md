Rohan Battula, Steven Chu, Jackson DeWitt, Erdi Haciogullari, Jeremy Tsai

--------------------------------Clink------------------------------------

To run the program, you'll need to download the node modules. In each
folder (clink and api), run the following command to install all of
the necessary node modules listed in package.json:

npm install

If there is any issue with this, you can also install the packages
manually. For the client-side (in the clink folder), the command
to install these packages is:

npm install --save react-router-dom socket.io-client \
    	    	   react-scroll-to-bottom query-string

For the server, side, these commands are:

npm install express ejs bcryptnpm install  
npm install express ejs  
npm install --save-dev nodemon dotenv  
npm install bcrypt  
npm install passport passport-local  
npm install express-session express-flash  
npm install method-override  
npm install --save cors socket.io

All of these commands are also listed in the README files in
both the clink and api folders.

Once the node modules have downloaded, you'll have to change the
local IP address for the server requests. This program runs on two
separate ports (one serves the local statics for the front-end and
the other serves the data used by the front-end via these post
requests). To do so, open up clink/src/index.js and go to the
line:

  sessionStorage.setItem('local-ip', 'Your local IP address here');

Change the 'Your local IP address here' string with a string of
your local IP address. When you're done, it should look something
like this (for an IP address of 123.456.7.89):

  sessionStorage.setItem('local-ip', '123:456:7:89');

Make sure to save the file after doing so.

At this point, everything done here should not have to be done again.
To start up the program, first go to the 'api' folder and run the
following command:

  node server.js

This will start up the back-end server on port 3000. Next, navigate
back to the main folder, and then go into the 'clink' folder and
run the following command:

  npm start

If this directs you to a prompt saying that your 3000 port is currently
in use and asks you if you'd like to use a different port, enter 'y'
into the prompt (or any other command that would tell the prompt that
you would like to use a different port).

On one of your local ports, the login page will be loaded, likely on
port 3001. If you close out this page, you can always re-open the page
by typing http://localhost:[PORT], with [PORT] replaced with the port
number, again likely 3001.

We have created 50 mock users for demonstration, with their usernames and
passwords in the form 'test#', where # is an integer from 1 to 50, inclusive.
For example, the user test12 has a username and password of test12, which
should be entered in the login page. To make a new user, go to the 'signup'
page and enter the necessary information.

Once you are logged in, you will see a number of page tabs across the
top. Each page is as follows:

About - about our mission

Search - look for other users by entering in the characteristics that
         you are looking for

Feed - displays users that you matched with

Profile - displays your current profile that you have set

Change Profile - where you can update your profile. As a new user,
       	         this is where you should go if you'd like to set
		 up your profile

Messages - displays the list of users whom you've messaged or who
	   have messaged you. Click on the button with their name
	   to open up an active message room between you and that
	   user

Log Out - when you're ready to leave, hit this button to log out


The rest of the website will show you what to do with helpful
prompts. Have fun (matching with made-up users)!