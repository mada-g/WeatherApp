import React from 'react';
import SideInfo from './SideInfo.jsx';
import Badge from './Badge.jsx';

const leftfields = [
  {key:'humidity', name:'humidity', units:'%'},
  {key: 'pop', name: 'chance of rain', units: '%'},
  {key: 'pressureMB', name:'pressure', units: ' bar'},
];

function rightfields(celsius){
  return [
    {key: 'windSpeedKPH', name:'wind speed', units: ' kph'},
    {key: 'windDir', name:'wind direction', units: ''},
    {key: celsius?'maxTempC':'maxTempF', name:'max temperature', units: '°'},
    {key: celsius?'minTempC':'minTempF', name:'min temperature', units: '°'}
  ];
}


export default class MainInfo extends React.Component{
  constructor(props){
    super(props);
  }



  sideData = (data, fields)=>{
    return fields.map((field) => {
      return {
        name: field.name,
        val: data[field.key] + field.units
      }
    });
  }

  renderBadge = (day, detail,celsius) => {
    return <Badge weatherInfo={day}
             location={this.props.app.location}
             date={this.props.app.date.formatted}
             width={detail ? "col-30" : "col-100"}
             toggleDetail={this.props.toggleDetail}
             detail={detail}
             celsius={celsius}/>
  }

  renderStatusInfo = (status) =>{
    if(status === 'fetching')
      return <div>
              <img src="assets/img/icons/fetching2.gif" />
             </div>
    else if(status === 'weather_error' || status === 'geolocation_error')
      return <div>An error has occured! Please enter a valid city and country</div>
    else
      return <div><p>Get the current weather and forecast information for the next five days.</p><p>Enter a city name</p></div>

}

  render(){
    const day = this.props.data.forecast.daily[this.props.app.day];
    const detail = this.props.app.detail;
    const dataOK = this.props.app.dataOK;
    const celsius = this.props.app.celsius;
    const status = this.props.app.status;

    console.log("DETAIL DETAIL DETAIL " + detail);

    return <div className="MainInfo component group">

      {(detail && dataOK) ? <SideInfo position="left" widgetData={this.sideData(day, leftfields)}/> : null}

      {(dataOK) ? this.renderBadge(day, detail,celsius) : <div className="statusInfo">{this.renderStatusInfo(status)}</div> }

           {(detail && dataOK) ? <SideInfo position="right" widgetData={this.sideData(day, rightfields(celsius))}/> : null}



    </div>
  }

}
