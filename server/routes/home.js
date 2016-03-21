import Router from 'koa-router';
import React from 'react';
import createLocation from 'history/lib/createLocation';
import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, createStore, dispatch} from 'redux';
import {toJS} from 'immutable';
import fetch from 'isomorphic-fetch';

import Routes from '../../shared/routes.jsx';
import render from '../utils/template-renderer.js';
import componentHTML from '../utils/componentHTML.js';
import reducer from '../../shared/store/reducer';
import * as actions from '../../shared/store/actions';


import googlePlaceAPI from '../api/googleAPI.js';
import weatherAPI from '../api/weatherAPI.js';
import geolocationIP from '../api/geolocationIP.js';



let initialState = {

  app: {
      location: "City, Country",

      date: {
        formatted: 'January 2',
        dayOfWeek: 'Monday'
      },

      graph: {
        width: 600,
        height: 90
      },

      day: 0,
      detail: true,
      dataOK: false,
      status: 'start',
      celsius: true,
  },

  data: {
    forecast: {
      daily: [{},{}],
      hourly: {}
    }
  }


};


const routes = Routes('/forecast');

let router = new Router();


router.get('/forecast', function *(next){

    console.log(this.req.url);

    const store = applyMiddleware(thunkMiddleware)(createStore)(reducer);

    yield store.dispatch(actions.initializeState(initialState));

  //  console.log(initialState.toJS());

    let ip = this.request.ip;

    if(ip === "::ffff:127.0.0.1")
      ip = "124.122.130.249";

    const geolocation = yield geolocationIP.get(ip);

    if(geolocation.status === "OK"){
      try{
        console.log("fetching weather data...")
        let weatherData = yield weatherAPI.get(geolocation.city, geolocation.loc);
        yield store.dispatch(actions.setForecastData(weatherData));
        store.dispatch(actions.setDataOK(true));
        console.log("weather data received...");

      } catch(error) {
        store.dispatch(actions.setDataOK(false));
        console.log("data NOT received! " + error);
      }


      try{
        const state = store.getState().toJS();
        const html = yield componentHTML(routes, this.req.url, store);
        this.body = yield render('index', {ReactComponent: html, redux: JSON.stringify(state)});
      } catch(error){
        console.log("ERROR: " + error);
        this.response.body = {status: "rendering_error"};
      }

    }

    else{
      this.response.body = {status: "ip_error"};
    }


  });


export default router;
