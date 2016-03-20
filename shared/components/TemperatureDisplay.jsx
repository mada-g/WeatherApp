import React from 'react';

export default class TemperatureDisplay extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return <div className="TemperatureDisplay">
      <span className={"value " + this.props.size}>{this.props.value}
        <span className={"unit " + this.props.size}> °{this.props.unit}</span>
      </span>
    </div>
  }

}
