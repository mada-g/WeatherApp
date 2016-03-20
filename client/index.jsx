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

//const history = createBrowserHistory();

//let initialState = window.__init_state;

/*let initialState = {

  app: {
      location: "Munich, Germany",

      date: {
        formatted: 'January 2',
        dayOfWeek: 'Monday'
      },

      graph: {
        width: 600,
        height: 90
      },

      day: 0,
      detail: false
  },

  data: {
    forecast: {
      daily: [{},{}],
      hourly: {}
    }
  }


};
*/

let initialState = window.__init_state;


console.log("aaa: " + initialState);


/*Object
  .keys(initialState)
  .forEach(key => {
    initialState[key] = fromJS(initialState[key]);
   });
*/

initialState = fromJS(initialState);

const store = applyMiddleware(thunkMiddleware)(createStore)(reducer, initialState);


render(
  <Provider store={store}>
    <Router children={routes} history={browserHistory}>
    </Router>
  </Provider>,
  document.getElementById('react-view')
);
