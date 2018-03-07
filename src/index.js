/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
require('./favicon.ico');
import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';
import configureStore from './store/configureStore'
import rootSaga from './sagas'
import { Provider } from 'react-redux'

var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');


// Instantiate the socket client (`io`)
// (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
var io = sailsIOClient(socketIOClient);

// Set some options:
// (you have to specify the host and port of the Sails backend when using this library from Node.js)
io.sails.url = 'http://159.65.131.200:1337/';

window.io = io;


const store = configureStore(window.__INITIAL_STATE__)
store.runSaga(rootSaga);

injectTapEventPlugin();

render(
    <Provider store={store}>
        <Router routes={routes}  history={browserHistory} />
    </Provider>, document.getElementById('app')
);
