import fetch from 'isomorphic-fetch';
import keys from '../../keys';

import {extractDate, extractTime, trimDecimals} from '../utils/formatHelpers.js';

const googleKey = keys.googleAPI;

function apiPlaces(place){
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&type=(cities)&key=${googleKey}`;
}

function getAddress(res){
  let arr = [];
  let str = "";

  if(res.address_components)
    arr = res.address_components;
  else
    return null;

  str = arr[0].long_name;

  if(arr.length >= 2){
    if(arr[arr.length - 1].short_name === "US" && arr.length >= 3){
      str += `, ${arr[arr.length - 2].short_name}`;
    }

    str += `, ${arr[arr.length - 1].long_name}`;
  }

  return str;

}

function mergeTerms(arr){
  let val = "";
  arr.forEach((elem) => {val += elem['value'] + ','});
  return val.slice(0,-1);
}

export default {
  get: function(city){

    return fetch(apiPlaces(city))
    .then((response)=>{
      return response.json();
    })
    //.then(response => {console.log(response); return response})
    .then((response)=>{

      if(response.status === "OK"){
        const res = response.results[0];

        console.log(res);

        return {
          status: 'OK',
          //city: mergeTerms(response.predictions[0].terms)
          city: getAddress(res),
          loc: {lat: trimDecimals(res.geometry.location.lat),
                long: trimDecimals(res.geometry.location.lng)},
        }
      }

      else{
        return {
          status: "geolocation_error",
          city: ""
        }
      }

    })

  }
};
