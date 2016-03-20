import React from 'react';

export default class SideWidget extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return <div className="SideWidget component">
      <div className='SideWidget-content'>
        <div className="title">
          {this.props.name}
        </div>
        <div className="value">
          {this.props.val}
        </div>
      </div>
    </div>
  }
}
