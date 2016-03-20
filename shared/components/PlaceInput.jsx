import React from 'react';

export default class PlaceInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      inputVal: "",
    }
  }

  handleChange = (event)=>{
    this.setState({inputVal: event.target.value})
    console.log("INPUT: " + this.state.inputVal);
  }

  handleSubmit = (event)=>{
    console.log("SUBMITED: " + this.state.inputVal);
    this.setState({inputVal: ""});

    this.props.getWeather(this.state.inputVal);
  }

  render(){
    return <div className="PlaceInput">
      <form onSubmit={this.handleSubmit}>
        <input type="text"
               value={this.state.inputVal}
               onChange={this.handleChange}
               placeholder = "enter city name"
        />

      <div className="submit-button" onClick={this.handleSubmit}>
        <img src="assets/img/icons/submit.png" />
      </div>

      </form>
    </div>
  }

}
