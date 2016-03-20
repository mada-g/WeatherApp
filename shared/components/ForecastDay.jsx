import React from 'react';

import WeatherIcon from './WeatherIcon.jsx';
import TemperatureDisplay from './TemperatureDisplay.jsx';

export default class ForecastDay extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return <div className={"ForecastDay component " + (this.props.isSelected ? "selected-day" : "")}
                onClick={this.props.handleDayClick}>
      <div className="content">
        <div>
          {this.props.dayOfWeek}
        </div>

        <WeatherIcon base="assets/img/icons/" src={this.props.weatherCoded} extension = ".png" size="small"/>

        <TemperatureDisplay size="small" value={this.props.temp} unit="F"/>

        <div>
        </div>

      </div>
    </div>
  }
}
