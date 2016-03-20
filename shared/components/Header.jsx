import React from 'react';

import PlaceInput from './PlaceInput.jsx';

const clientID = "nY4l9nBzAlU2OMBj7JkIK";
const clientSecret = "1vphBwhMHaGOOc8kmWs8HcGUIVeVufI03qHDXCnL";
const fields = "periods.dateTimeISO,periods.avgTempC,periods.avgTempF,periods.maxTempC,periods.maxTempF,periods.minTempC,periods.minTempF"
              + "periods.pop,periods.humidity,periods.pressureMB,periods.windDir,periods.windSpeedKPH,periods.weather,periods.icon";
const api = `http://api.aerisapi.com/forecasts/munich,germany?from=today&to=+5days&client_id=${clientID}&client_secret=${clientSecret}`;


export default class Header extends React.Component{
  constructor(props){
    super(props);
  }

  handleUnitClick = (isCelsius) =>{
    return () => {
      this.props.setUnit(isCelsius);
    }
  }

  render(){
    var data = this.props.data;
    const celsius = this.props.app.celsius;

    if(data.forecast){
      console.log(data.forecast);
    }
    return <div className="Header component">

              <div className="title"
                          onClick={() => {this.props.getWeather('berlin')}}>
                          forecast.earth
              </div>

              <PlaceInput {...this.props}/>

              <div className="unit-container">
                <div className={"unit " + (celsius?"selected":"")} onClick={this.handleUnitClick(true)}>
                  <div className="label">°C</div>
                </div>
                <div className={"unit " + (!celsius?"selected":"")} onClick={this.handleUnitClick(false)}>
                  <div className="label">°F</div>
                </div>
              </div>

    </div>
  }

}
