/*const weatherCodeMap = {
  A : "other",
  BD : "other",
  BN : "other",
  BR : "other",
  BS : "snow",
  BY : "rain",
  F : "other",
  FR : "other",
  H : "other",
  IC : "other",
  IF : "other",
  IP : "snow",
  K : "other",
  L : "rain",
  R : "rain",
  RW : "hrain",
  RS : "snow",
  SI : "snow",
  WM : "snow",
  S : "snow",
  SW : "snow",
  T : "storm",
  UP : "rain",
  VA : "other",
  WP : "rain",

  CL : "sunny",
  FW : "sunny",
  SC : "pcloudy",
  BK : "cloudy",
  OV : "vcloudy",

}
*/


const weatherCodeMap = {
  A : "other",
  BD : "other",
  BN : "other",
  BR : "other",
  BS : "snow",
  BY : "rain",
  F : "other",
  FR : "other",
  H : "other",
  IC : "other",
  IF : "other",
  IP : "snow",
  K : "other",
  L : "rain",
  R : "rain",
  RW : "rain",
  RS : "rain",
  SI : "snow",
  WM : "snow",
  S : "snow",
  SW : "snow",
  T : "storm",
  UP : "rain",
  VA : "other",
  WP : "rain",

  CL : "sunny",
  FW : "sunny",
  SC : "pcloudy",
  BK : "cloudy",
  OV : "cloudy",

}


export function extractDate(val){
  return val.substring(0, val.lastIndexOf('T'));
}

export function extractTime(val){

  let time = "";

  if(val.lastIndexOf('+') === -1)
    time = val.substring(val.lastIndexOf('T')+1, val.lastIndexOf('-'));
  else
    time = val.substring(val.lastIndexOf('T')+1, val.lastIndexOf('+'));

  return time.substring(0, time.lastIndexOf(':'));
}


export function trimDecimals(num){

  let approx = "" + num;

  if(approx.lastIndexOf('.') === -1)
    return approx;

  else{
    let base = approx.substring(0, approx.lastIndexOf('.'));
    approx = approx.substring(approx.lastIndexOf('.') + 1, approx.length);

    console.log(base);

    while(approx.length > 3){
      approx = approx.slice(0,-1);
    }

    return `${base}.${approx}`;
  }

}

export function extractWeatherCode(weather, cloud){
  let mainCode = weather.substring(weather.lastIndexOf(':')+1, weather.length);

  mainCode = (weatherCodeMap[mainCode]==="other") ? weatherCodeMap[cloud] : weatherCodeMap[mainCode];

  //console.log("weather: "+weather);
  //console.log("clouds: "+cloud);
  //console.log("code: "+mainCode);

  return mainCode;
}
