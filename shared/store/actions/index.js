import fetch from 'isomorphic-fetch';

import {dayName, dateFormat} from '../../utils/helpers.js';

/*const clientID = "nY4l9nBzAlU2OMBj7JkIK";
const clientSecret = "1vphBwhMHaGOOc8kmWs8HcGUIVeVufI03qHDXCnL";

const googleKey = "AIzaSyCWyrzUMv7D_G1hiEs7gDteRpUCUNgjDgQ";

const fields = "periods.dateTimeISO,periods.avgTempC,periods.avgTempF,periods.maxTempC,periods.maxTempF,periods.minTempC,periods.minTempF,"
              + "periods.pop,periods.humidity,periods.pressureMB,periods.windDir,periods.windSpeedKPH,periods.weather,periods.icon";


function apiWeather(city,filter){
  return `http://api.aerisapi.com/forecasts/${city}?fields=${fields}&filter=${filter}&from=today&to=+6days&client_id=${clientID}&client_secret=${clientSecret}`;
}

function apiPlaces(place){
  return `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}&type=(cities)&key=${googleKey}`;
}
*/


export function doSomething(val){
  return {
    type: 'DO_SOMETHING',
    val
  }
};

export function asyncAction(val){
  return function(dispatch){

  }
};

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


/*
export function getForecast(place){
  return function(dispatch){
    return dispatch(getPlace(place))
            .then((city) =>{
              return Promise.all([
                dispatch(getDailyForecast(city)), dispatch(getHourlyForecast(city))
              ])
            })
  }
}





export function getDailyForecast(city){
    return function(dispatch){
      return fetch(apiWeather(city,'day'))
              .then(response => {
                return response.json();
              })
              .then(response => {
                console.log(response);
                return dispatch(setDailyForecast(response));
              })

    }
}

export function getHourlyForecast(city){
  return function(dispatch){
    return fetch(apiWeather(city,'1hr'))
            .then(response => {
              return response.json();
            })
            .then(response => {
              return dispatch(setHourlyForecast(response));
            })
  }

}
*/

export function setDayIndex(index, date){
  return {
    type: 'SET_DAY',
    val: {index, date: dateFormat(date)}
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

export function getWeather(place){
  return function(dispatch){
    dispatch(setDataOK(false));
    dispatch(setStatus('fetching'));
    return fetch(`http://localhost:3000/api/forecast?${place}`)
                .then(response => {return response.json()})
                .then(response => {
                  if(response.status === "OK"){
                    dispatch(setDataOK(true));
                    dispatch(setStatus('OK'));
                    dispatch(setDayIndex(0, response.daily[0].date));
                    return dispatch(setForecastData(response));
                  }
                  else{
                    dispatch(setDataOK(false));
                    return dispatch(setStatus(response.status));
                  }
                })
                .catch(error => {
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



/*
export function getPlace(place){
  return function(dispatch){
    return fetch(`http://localhost:3000/api/place/${place}`)
    .then(response => {
      return response.json()
      })
    .then(response => {
      dispatch(setPlace(response.city));
      return Promise.resolve(response.city);
    })
  }
}
*/


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
