import fetch from 'isomorphic-fetch';

import config from '../../config.js';
import {dayName, dateFormat} from '../../utils/helpers.js';


const googleKey = "AIzaSyCWyrzUMv7D_G1hiEs7gDteRpUCUNgjDgQ";

function apiPlaces(place){
  //return `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}&type=(cities)&key=${googleKey}`;
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&type=(cities)&key=${googleKey}`;
}



export function setDailyForecast(val){
  return {
    type: 'SET_DAILY_FORECAST',
    val
  }
}

export function setHourlyForecast(val){
  return {
    type: 'SET_HOURLY_FORECAST',
    val
  }
}


export function setDayIndex(index){
  return {
    type: 'SET_DAY',
    val: {index: index}
  }
}

export function setDate(val){
  return {
    type: 'SET_DATE',
    val: dateFormat(val)
  }
}

export function setPlace(place){
  return {
    type: 'SET_PLACE',
    val: place
  }
}


export function setForecastData(data){
  return {
    type: 'SET_FORECAST_DATA',
    val: data
  }
}


export function getRes(place){
  return function(dispatch){
    return fetch(apiPlaces(place))
                .then(response => {return response.json()})
                .then(response => {
                  console.log(response);
                })
                .catch(console.log);
  }
}

export function getWeather(place){
  return function(dispatch){
    dispatch(setDataOK(false));
    dispatch(setStatus('fetching'));
    return fetch(`${config.host}/api/forecast?${place}`)
                .then(response => {return response.json()})
                .then(response => {
                  if(response.status === "OK"){
                    dispatch(setDataOK(true));
                    dispatch(setStatus('OK'));
                    console.log('ok');
                    dispatch(setDayIndex(0));
                    console.log(response);
                    return dispatch(setForecastData(response));
                  }
                  else{
                    dispatch(setDataOK(false));
                    return dispatch(setStatus(response.status));
                  }
                })
                .catch(error => {
                  console.log(error);
                  dispatch(setStatus('fetching_error'));
                  return dispatch(setDataOK(false))
                })
  }
}

export function setStatus(status){
  return {
    type: "SET_STATUS",
    val: status
  }
}


export function toggleDetail(date){
  return {
    type: "TOGGLE_DETAIL",
  }
}

export function initializeState(val){
  return {
    type: "INITIALIZE_STATE",
    val
  }
}

export function setDataOK(val){
  return {
    type: "SET_DATA_OK",
    val
  }
}

export function setUnit(isCelsius){
  return {
    type: "SET_UNIT",
    val: isCelsius
  }
}

export function updateCycle(){
  return {
    type: "UPDATE_CYCLE",
  }
}
