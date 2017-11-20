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

const store = configureStore(window.__INITIAL_STATE__)
store.runSaga(rootSaga);

injectTapEventPlugin();

render(
    <Router routes={routes} store={store} history={browserHistory} />, document.getElementById('app')
);
