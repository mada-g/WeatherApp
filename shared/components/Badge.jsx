import React from 'react';

import {dayName, dateFormat} from '../utils/helpers.js';

import WeatherIcon from './WeatherIcon.jsx';
import TemperatureDisplay from './TemperatureDisplay.jsx';

export default class Badge extends React.Component{
  constructor(props){
    super(props);
  }

  renderInfo = (weather, celsius)=>{
    if(weather.weatherCoded && weather.avgTempC && weather.avgTempF){
      return <div>
        <WeatherIcon base="assets/img/icons/" src={weather.weatherCoded} extension = ".png" size="normal"/>
        <div className="temp">
          <TemperatureDisplay size="large" value={celsius ? weather.avgTempC:weather.avgTempF} unit={celsius?"C":"F"}/>
        </div>
      </div>
    }

    else{
      return "";
    }
  }

  render(){
    console.log(">>>>>>>>>>>>>>>>>>>>");
    console.log(this.props.weatherInfo);
    console.log("<<<<<<<<<<<<<<<<<<<<");

    const weatherInfo = this.props.weatherInfo;

    return <div className={"Badge component " + this.props.width}>
      <div className="container">
        <div className="location">
          {this.props.location.toLowerCase()}
        </div>
        <div className="time">
          {dateFormat(weatherInfo.date).toLowerCase()}
        </div>
        <div className="weather-info group">
          {this.renderInfo(weatherInfo, this.props.celsius)}
        </div>
        <div className="weather-desc">
          {weatherInfo.weather? weatherInfo.weather : ""}
        </div>
      </div>

    </div>
  }

}


/*
<div className="toggle-detail"
      onClick={this.props.toggleDetail}>
      {!this.props.detail? <img src="assets/img/icons/expand2.png" /> : <img src="assets/img/icons/collapse2.png" />}
</div>

*/
