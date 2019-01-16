import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import sunnyLogo from './sunny-icon.png';
import cloudyLogo from './cloudy-icon.png';
import rainyLogo from './rainy-icon.png';
import snowyLogo from './snowy-icon.png';
var createReactClass = require('create-react-class');
//{appid=1f1128a9adbf296b8644ae2ac6f80fa1}
// https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=YOUR_API_KEY
// https://api.openweathermap.org/data/2.5/forecast?q=Whitehorse,ca&appid=1f1128a9adbf296b8644ae2ac6f80fa1

var Day = createReactClass({
    render: function() {
        return <p><em>{this.props.day}</em></p>
    }
})

var WeatherIcon = createReactClass({
    render: function() {
        return <img src={this.props.icon} alt="Weather icon"/>
    }
})

var ForecastTemp = createReactClass({
    render: function() {
        return <p><span>{this.props.highTemp}&#176;</span> <span className="singleday-low-temp"><em>{this.props.lowTemp}&#176;</em></span></p>
    }
})

var FiveDayForecast = [];
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Whitehorse,ca&units=metric&appid=1f1128a9adbf296b8644ae2ac6f80fa1')
    .then(response => response.json())
    .then(myJson => console.log(JSON.stringify(myJson)))
    // .then(data => FiveDayForecast.push(...data));
  
console.table(FiveDayForecast);
    // .then(myJson => console.log(JSON.stringify(myJson)))
    // .then(json => json[0]
    //     .split('. ')
    //     .forEach(sentence => self.add(sentence.substring(0, 25))))
// console.log(FiveDayForecast.list)

class SingleDayForecast extends React.Component {
    render() {
      return (
              <div className="single-day-forecast">
                <Day day={this.props.day} />
                <WeatherIcon icon={this.props.icon} />
                <ForecastTemp lowTemp={this.props.lowTemp} highTemp={this.props.highTemp} />
              </div>
      );
    }
  }
  
ReactDOM.render(<div className="five-day-forecast">
                    <SingleDayForecast day="Mon" icon={sunnyLogo} lowTemp={14} highTemp={20} />
                    <SingleDayForecast day="Tue" icon={cloudyLogo} lowTemp={10} highTemp={14} />
                    <SingleDayForecast day="Wed" icon={sunnyLogo} lowTemp={16} highTemp={23} />
                    <SingleDayForecast day="Thu" icon={rainyLogo} lowTemp={8} highTemp={5} />
                    <SingleDayForecast day="Fri" icon={snowyLogo} lowTemp={-2} highTemp={3} />
                    <div className="clear"></div>                   
                </div>, document.querySelector('#root'));