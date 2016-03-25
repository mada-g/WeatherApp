import fetch from 'isomorphic-fetch';

function getGeolocation(ip){
  return new Promise((resolve, reject) => {
    console.log(ip);
    fetch(`http://geoip.nekudo.com/api/168.1.23.88`)
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
              console.log(response.latitude + " ~~~~ " + response.longitude);
              return {
                loc:{
                  lat: response.location.latitude,
                  long: response.location.longitude,
                },
                city: `${response.city}, ${response.country.name}`,
                status: "OK",
              }
            })
            .catch(err => {return {status: "ERROR", ip: ip}});

  }
}
