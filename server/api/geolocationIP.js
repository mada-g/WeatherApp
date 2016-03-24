import fetch from 'isomorphic-fetch';

function getGeolocation(ip){
  return new Promise((resolve, reject) => {
    console.log(ip);
    fetch(`http://geoip.nekudo.com/api/${ip}`)
          .then(response => {return response.json()})
          .then(response => {console.log(response); return response})
          .then(response => {resolve(response)})
          .catch(err => {reject(err)});

  });
}

export default {
  get: function(ip){
    return getGeolocation(ip)
            .then(response => {
              return {
                loc:{
                  lat: response.latitude,
                  long: response.longitude,
                },
                city: `${response.city}, ${response.country.name}`,
                status: "OK",
              }
            })
            .catch(err => {return {status: "ERROR"}});

  }
}
