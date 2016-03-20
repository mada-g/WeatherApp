import React from 'react';
import {connect} from 'react-redux';
import {List, Map, fromJS, toJS} from 'immutable';

import Header from './Header.jsx';
import MainInfo from './MainInfo.jsx';
import GraphTemp from './GraphTemp.jsx';
import ForecastBar from './ForecastBar.jsx';

import * as actions from '../store/actions';

var points = [
  50,
  76,
  80,
  120,
  160,
  165,
  189,
  199
];


export class App extends React.Component{

  getBackgroundCode = (code) => {
    if(code === 'cloudy' || code === 'vcloudy')
      return 'clouds.gif';
    if(code ==='rain' || code ==='hrain' || code ==='storm')
      return 'raining.gif';
    if(code ==='sunny' || code ==='pcloudy')
      return 'telescopes.jpg';
    if(code ==='snow')
      return 'snowing.gif';
  }

  renderBackground =(daily, day) =>{
    let code = "";
    if(daily[day]){
      code = this.getBackgroundCode(daily[day].weatherCoded);
    }
    else{
      code = 'sunny.jpg';
    }

    console.log('BACKGROUND: ' + code);

    return <div className="App-gif">
      <img src={`/assets/img/${code}`} />
    </div>

  }

  render(){

    const detail = this.props.app.detail;
    const dataOK = this.props.app.dataOK;

    return <div className="App component">

      {this.renderBackground(this.props.data.forecast.daily, this.props.app.day)}

      <Header {...this.props}/>
      <div className="content-area">
        <MainInfo {...this.props}/>

        {(detail && dataOK) ? <GraphTemp{...this.props}/> : null}
        {(detail && dataOK) ? <ForecastBar {...this.props}/> : null}

      </div>

      {this.props.children}
    </div>
  }

}

/*
{(()=>{if(this.props.app.detail) return <GraphTemp{...this.props}/> })()}
{(()=>{if(this.props.app.detail) return <ForecastBar {...this.props}/> })()}
*/


export function select(state){
  return {
    app: state.get('app').toJS(),
    data: state.get('data').toJS()
  }
};

export const AppX = connect(select, actions)(App);
