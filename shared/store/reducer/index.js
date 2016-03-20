import {List, Map, fromJS} from 'immutable';

import {dayName, dateFormat} from '../../utils/helpers.js';


const INIT_STATE = Map();

function extractDate(val){
  return val.substring(0, val.lastIndexOf('T'));
}

function extractTime(val){

  let time = "";

  if(val.lastIndexOf('+') === -1)
    time = val.substring(val.lastIndexOf('T')+1, val.lastIndexOf('-'));
  else
    time = val.substring(val.lastIndexOf('T')+1, val.lastIndexOf('+'));

  return time.substring(0, time.lastIndexOf(':'));
}

export default function(state = INIT_STATE, action){

  switch (action.type) {

    case 'DO_SOMETHING': {
      return state.set('anItem', action.val);
    }

    case 'SET_DAY': {
      return state.setIn(['app', 'day'], action.val.index)
                  .setIn(['app','date', 'formatted'], action.val.date)
    }

    case 'SET_DATE': {
      return state.setIn(['app', 'date', 'formatted'], action.val);
    }

    case 'SET_FORECAST_DATA': {

      return state.setIn(['data', 'forecast', 'daily'], fromJS(action.val.daily))
                  .setIn(['data', 'forecast', 'hourly'], fromJS(action.val.hourly))
                  .setIn(['app', 'location'], action.val.city)

    }

    case 'SET_HOURLY_FORECAST': {
      let forecast = action.val.response[0].periods;
      let data = {};

      forecast.forEach(hour => {
        hour.date = extractDate(hour.dateTimeISO);
        hour.time = extractTime(hour.dateTimeISO);

        if(!data[hour.date])
          data[hour.date] = [];

        data[hour.date].push({
          time: hour.time,
          avgTempC: hour.avgTempC,
          avgTempF: hour.avgTempF
        })
      });



      return state.setIn(['data', 'forecast', 'hourly'], fromJS(data));
    }

    case 'SET_DAILY_FORECAST': {
      let forecast = action.val.response[0].periods;
      forecast.forEach(day => {
        day.date = extractDate(day.dateTimeISO);
        day.time = extractTime(day.dateTimeISO);
      });


      return state.setIn(['data','forecast','daily'], fromJS(forecast));
    }

    case 'SET_PLACE': {
      return state.setIn(['app', 'location'], action.val);
    }

    case 'TOGGLE_DETAIL': {
      return state.updateIn(['app', 'detail'], val => !val)

    }

    case 'INITIALIZE_STATE': {
      return fromJS(action.val);
    }

    case 'SET_DATA_OK': {
      return state.setIn(['app', 'dataOK'], action.val);
    }

    case 'SET_UNIT': {
      return state.setIn(['app', 'celsius'], action.val);
    }

    case 'SET_STATUS': {
      return state.setIn(['app', 'status'], action.val);
    }

    default:
      return state;
  }

};
