import Router from 'koa-router';

import googlePlaceAPI from './googleAPI.js';
import weatherAPI from './weatherAPI.js';
import geolocationIP from './geolocationIP.js';

let router = Router();

router.get('/api/place/:city', function *(next){
            console.log("QUERY: "+ this.request.querystring);
            this.response.body = yield googlePlaceAPI.get(this.params.city);
          });

router.get('/api/forecast', function *(next){

            //console.log(this.request.headers);

            console.log(this.request.ip);

            //const loc = yield geolocationIP.get(this.request.ip);

            //console.log(loc);

            const placePrediction = yield googlePlaceAPI.get(this.request.querystring);

            if(placePrediction.status === 'OK'){
              console.log("PLACE: " + placePrediction.city);
              console.log("latitude: " + placePrediction.loc.lat);
              console.log("longitude: " + placePrediction.loc.long)
              console.log(placePrediction.status);

              try{
                this.response.body = yield weatherAPI.get(placePrediction.city, placePrediction.loc);
                console.log("REPLIED")
              } catch(error){
                console.log("ERROR: " + error);
                this.response.body = {status: "weather_error"};
              }
            }

            else{
              this.response.body = {status: "geolocation_error"};
            }

});

export default router;
