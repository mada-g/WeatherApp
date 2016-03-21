import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {List, Map, fromJS, toJS} from 'immutable';
import {applyMiddleware, createStore, dispatch} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';

import setup_routes from '../shared/routes';
import config from '../config/client.js';
import reducer from '../shared/store/reducer';

import * as actions from '../shared/store/actions';

const routes = setup_routes(config.routes.home);

import './main.scss';

let initialState = window.__init_state;


initialState = fromJS(initialState);

const store = applyMiddleware(thunkMiddleware)(createStore)(reducer, initialState);


render(
  <Provider store={store}>
    <Router children={routes} history={browserHistory}>
    </Router>
  </Provider>,
  document.getElementById('react-view')
);
