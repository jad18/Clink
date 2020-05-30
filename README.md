Rohan Battula, Steven Chu, Jackson DeWitt, Erdi Haciogullari, Jeremy Tsai
Clink

To run the program, you'll likely need to download the following node
modules (by saying 'npm install --save ...' with ... replaced by the
following packages):


Once the node modules have downloaded, you'll have to change the
local IP address for each server request. This program runs on two
separate ports (one serves the local statics for the front-end and
the other serves the data used by the front-end via these post
requests). There is one post request on each of the following pages
(simply search for '[localhost]' in that page and replace this entire
expression, including the square brackets, with your local IP address.
All of the following are under the folder clink/src/components):

login_page.js
signup_page.js
feed.js
Search/search_home.js
Change_Profile/general_form.js
Change_Profile/personality_form.js
Change_Profile/personal_info_form.js
Message_Home/message_home.js

