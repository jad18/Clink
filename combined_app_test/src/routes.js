import React from 'react';
import { Route, IndexRoute } from 'react-router-dom';

import App from './components/App.js';
import FeedPage from './components/feed.js';
import AboutPage from './components/about_page.js';
import MessagesPage from './components/messages.js';

const routes = (
    <Route path="/" component={App}>
      <IndexRoute component={FeedPage}/>
      <Route path="about" component={AboutPage}/>
      <Route path="*" component={MessagesPage}/>
    </Route>
  );
  
  export default routes;