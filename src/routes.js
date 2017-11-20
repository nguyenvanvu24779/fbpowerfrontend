import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import FormPage from './containers/FormPage';
import TablePage from './containers/TablePage';
import StreamVideoPage from './containers/StreamVideoPage';
import StreamVideoFormPage from './containers/StreamVideoFormPage';
import GroupManagementPage from './containers/GroupManagementPage';
import Dashboard from './containers/DashboardPage';

export default (
  <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="form" component={FormPage}/>
      <Route path="table" component={TablePage}/>
      <Route path="stream" component={StreamVideoPage}/>
      <Route path="streamVideoForm" component={StreamVideoFormPage}/>
      <Route path="groupMngt" component={GroupManagementPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
