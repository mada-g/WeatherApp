import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class SideWidget extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cycle: "unmounted"
    }
  }

  componentDidMount = () =>{
    console.log(this.props.name + " will mount");
    this.setState({cycle: "mounted"});
  }

  componentWillUnmount = () => {
    this.setState({cycle: "unmounted"});
  }

  //    return <ReactCSSTransitionGroup transitionName="SideInfo-anim" transitionEnterTimeout={3000} transitionLeaveTimeout={3000}>

  render(){
    return <div className={`SideWidget component ${this.state.cycle}`}>
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
