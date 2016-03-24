import React from 'react';

import PlaceInput from './PlaceInput.jsx';

export default class Header extends React.Component{
  constructor(props){
    super(props);
  }

  handleUnitClick = (isCelsius) =>{
    return () => {
      this.props.setUnit(isCelsius);
      this.props.getRes("london");
    }
  }

  render(){
    var data = this.props.data;
    const celsius = this.props.app.celsius;

    return <div className="Header component">

              <div className="title">
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
