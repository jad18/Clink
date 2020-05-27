import React from 'react';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import routes from '../routes';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <BrowserRouter history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    );
  }
}