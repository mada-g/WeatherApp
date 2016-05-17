import React from 'react';


export default class SideWidget extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cycle: "unmounted"
    }
  }

  componentDidMount = () =>{
    this.setState({cycle: "mounted"});
  }

  componentWillUnmount = () => {
    this.setState({cycle: "unmounted"});
  }


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
