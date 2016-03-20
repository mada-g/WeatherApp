import React from 'react';

export default class WeatherIcon extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    console.log("SRC SRC SRC SRC SRC");
    console.log(this.props.src);

    return <div className={"WeatherIcon component " + this.props.size}>
      {(() => {
        if(this.props.src)
          return <img src={this.props.base + 'alt/' + this.props.src + this.props.extension} />
      })()}
    </div>
  }
}
