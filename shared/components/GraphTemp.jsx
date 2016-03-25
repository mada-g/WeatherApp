import React from 'react';

import {timeFormat} from '../utils/helpers.js';

import GraphLine from './GraphLine.jsx';

export default class GraphTemp extends React.Component{

  constructor(props){
    super(props);
  }


  getValueLimits = (arr, celsius) =>{
    let limits = [999,-999,0];

    arr.forEach(val => {
      const temp = celsius ? val.avgTempC : val.avgTempF;

      if(temp < limits[0])
        limits[0] = temp;
      if(temp > limits[1])
        limits[1] = temp;
    })

    limits[2] = limits[1] - limits[0];

    return limits;
  }

  getDataPoints = (arr, unit, min, celsius) => {
    return arr.map(val => {
      const temp = celsius ? val.avgTempC : val.avgTempF;
      return {
        avgTemp: temp,
        y: (temp-min)*unit,
        x: timeFormat(val.time),
        img: val.weatherCoded
      }
    })
  }

  getCompleteArray = (forecast, day) => {

    const date = forecast.daily[day].date;
    const nextDate = forecast.daily[day+1].date;

    let hourStore = forecast.hourly[date] || [];

    var n = 0;
    while(hourStore.length < 25 && forecast.hourly[nextDate]){
      hourStore.push(forecast.hourly[nextDate][n++]);
    }

    console.log("LENGTH: " + hourStore.length);
    return hourStore;
  }

  render(){

    const celsius = this.props.app.celsius;

    let hourly = this.getCompleteArray(this.props.data.forecast, this.props.app.day);

    const limits = this.getValueLimits(hourly, celsius);
    const unit = this.props.app.graph.height / limits[2];

    const dataPoints = this.getDataPoints(hourly, unit, limits[0], celsius);


    return <div className="GraphTemp component">
      <div className="GraphTemp-content">
        {this.props.app.detail ? <GraphLine dataPoints={dataPoints} height={this.props.app.graph.height} detail={this.props.app.detail}/> : null }
      </div>
    </div>
  }

}
