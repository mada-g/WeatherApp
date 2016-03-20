import fetch from 'isomorphic-fetch';

import {extractDate, extractTime, trimDecimals, extractWeatherCode} from '../utils/formatHelpers.js';

const clientID = "nY4l9nBzAlU2OMBj7JkIK";
const clientSecret = "1vphBwhMHaGOOc8kmWs8HcGUIVeVufI03qHDXCnL";

const fields = "periods.dateTimeISO,periods.avgTempC,periods.avgTempF,periods.maxTempC,periods.maxTempF,periods.minTempC,periods.minTempF,"
              + "periods.pop,periods.humidity,periods.pressureMB,periods.windDir,periods.windSpeedKPH,periods.weather,periods.icon,periods.weather,periods.weatherPrimaryCoded, periods.cloudsCoded";




function apiWeather(loc,filter){
  return `http://api.aerisapi.com/forecasts?p=${loc.lat},${loc.long}&fields=${fields}&filter=${filter}&from=today&to=+6days&client_id=${clientID}&client_secret=${clientSecret}`;
}


function fetchDailyForecast(loc){
  return new Promise(function(resolve, reject){
    fetch(apiWeather(loc, "day"))
            .then(response => {return response.json()})
            .then(data => {
              if(!data.success) reject(data.error.code)

              else{
              let forecast = data.response[0].periods;
              forecast.forEach(day => {
                day.date = extractDate(day.dateTimeISO);
                day.time = extractTime(day.dateTimeISO);
                day.weatherCoded = extractWeatherCode(day.weatherPrimaryCoded, day.cloudsCoded);
              });
              resolve(forecast);
            }
            })
            .catch(error => {reject("weather_error")})

  })
}

function fetchHourlyForecast(loc){
  return new Promise(function(resolve, reject){
    fetch(apiWeather(loc, "1hr"))
            .then(response => {return response.json()})
            .then(output => {
              if(!output.success) reject(output.error.code);

              else{
                let forecast = output.response[0].periods;
                let data = {};
                forecast.forEach(hour => {
                  hour.date = extractDate(hour.dateTimeISO);
                  hour.time = extractTime(hour.dateTimeISO);

                  if(!data[hour.date])
                  data[hour.date] = [];

                  data[hour.date].push({
                    time: hour.time,
                    avgTempC: hour.avgTempC,
                    avgTempF: hour.avgTempF,
                    weatherCoded: extractWeatherCode(hour.weatherPrimaryCoded, hour.cloudsCoded),
                  })

                })
                resolve(data);
              }
            })
            .catch(error => {reject("weather_error")})

  })
}

export default {
  /*
  get: function(city){
        let forecast = {};
        return new Promise(function(resolve, reject){
          fetchDailyForecast(city)
          .then(data => {
            forecast.daily = data;
            return fetchHourlyForecast(city)
          })
          .then(data => {
            forecast.hourly = data;
            forecast.city = city;
            forecast.status = "ok";
            resolve(forecast);
          })
          .catch(reject);
        })
  }*/


  get: function(city, loc){
    let forecast = {};
    return Promise.all([fetchDailyForecast(loc), fetchHourlyForecast(loc)])
                      .then(result => {
                        forecast.daily = result[0];
                        forecast.hourly = result[1];
                        forecast.city = city;
                        forecast.status = "OK";
                        return forecast;
                      })
                      .catch(error => {reject("weather_error")})

  }
}
