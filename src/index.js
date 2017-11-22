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

const store = configureStore(window.__INITIAL_STATE__)
store.runSaga(rootSaga);

injectTapEventPlugin();

render(
    <Provider store={store}>
        <Router routes={routes}  history={browserHistory} />
    </Provider>, document.getElementById('app')
);
