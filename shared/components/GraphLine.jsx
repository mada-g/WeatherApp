import React from 'react';


export default class GraphLine extends React.Component{

  constructor(props){
    super(props);
  }

  renderWeatherIcon = (ctx, src, x, y) => {
    var img = new Image();
    img.src = '/assets/img/icons/alt/' + src + '.png';
    img.className = 'small';
    ctx.drawImage(img, x, y, 30, 30);
  }

  renderGraph = (ctx, data, h)=>{
    ctx.lineJoin= "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 4;
    ctx.textAlign = "center";

    ctx.beginPath();

    let i = 10;
    let n = 0;
    data.forEach(point => {
      if(n === 0 )
        ctx.moveTo(n*25 + 30, (h+28)-point.y);
      else
        ctx.lineTo(n*25 + 30, (h+28)-point.y);


      if(n % 6 === 3){
        this.renderWeatherIcon(ctx, point.img, n*25 + 15, h+40);
      }

      if(n % 6 === 0){
        ctx.font = "800 15px Questrial";

        ctx.fillText(point.x, n*25 + 30, (h+55));
      }

      if(n % 3 === 0){
        ctx.font = "800 13px Questrial";
        /*ctx.globalAlpha = 0.5;
        this.renderWeatherIcon(ctx, point.img, n*25 + 15, (h-20)-point.y);
        ctx.globalAlpha = 1;*/
        ctx.fillText(point.avgTemp, n*25 + 30, (h+11)-point.y);
      }

      n++;

    })

    ctx.stroke();
  }

  componentDidUpdate = ()=>{
    if(this.props.detail){
      let ctx = React.findDOMNode(this.refs.canvas).getContext('2d');
      ctx.clearRect(0,0,650,400);
      this.renderGraph(ctx, this.props.dataPoints, this.props.height);
    }

  }

  componentDidMount = ()=>{
    if(this.props.detail){
      let ctx = React.findDOMNode(this.refs.canvas).getContext('2d');
      ctx.clearRect(0,0,680,400);
      this.renderGraph(ctx, this.props.dataPoints, this.props.height);
    }

  }

  render(){
    return <div className="GraphLine">

      <canvas ref="canvas" height={this.props.height+100} width={660}/>
    </div>
  }

}
