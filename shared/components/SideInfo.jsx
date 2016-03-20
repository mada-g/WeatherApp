import React from 'react';

import SideWidget from './SideWidget.jsx';

export default class SideInfo extends React.Component{
  constructor(props){
    super(props);
  }

  renderWidgets = (items)=>{
    return items.map((item)=>{
      return <SideWidget name={item.name} val={item.val} />
    });
  }

  render(){
    return <div className={"SideInfo component " + this.props.position}>
      <div className="container">
        {this.renderWidgets(this.props.widgetData)}
      </div>
    </div>
  }
}
