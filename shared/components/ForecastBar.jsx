import React from 'react';

import ForecastDay from './ForecastDay.jsx';

import {dayName, dateFormat} from '../utils/helpers.js';

export default class ForecastBar extends React.Component{

  constructor(props){
    super(props);
  }

  handleDayClick = (dailyIndex)=>{
    return () => {
      this.props.setDayIndex(dailyIndex, this.props.data.forecast.daily[dailyIndex].date);
    }
  }

  renderForecastDay = (forecastData, selectedDay, celsius) =>{
    let arr = forecastData.map((day,index) => {
      return <ForecastDay dayOfWeek={dayName(day.date)}
                          temp={celsius?day.avgTempC:day.avgTempF}
                          weatherCoded={day.weatherCoded}
                          handleDayClick = {this.handleDayClick(index)}
                          isSelected = {index === selectedDay}
                          celsius = {celsius}/>
                      });
    while(arr.length > 5)
      arr.pop();

    return arr;
  }

  render(){
    const daily = this.props.data.forecast.daily;
    const selectedDay = this.props.app.day;

    return <div className="ForecastBar component">
              {this.renderForecastDay(daily, selectedDay, this.props.app.celsius)}
          </div>
  }
}
