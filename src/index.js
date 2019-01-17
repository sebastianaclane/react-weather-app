import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import sunnyLogo from './sunny-icon.png';
import cloudyLogo from './cloudy-icon.png';
import rainyLogo from './rainy-icon.png';
import snowyLogo from './snowy-icon.png';
var createReactClass = require('create-react-class');
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

const weatherData = 'https://api.openweathermap.org/data/2.5/forecast?q=Whitehorse,ca&units=metric&appid=1f1128a9adbf296b8644ae2ac6f80fa1';

const FiveDayForecast = [];
// go to fetch documentation on mozilla developer network
// JAN.17TH: this block of code also works but accessing the elements in FiveDayForecast array after doesn't work for some reason?
fetch(weatherData)
    .then(response => response.json())
    .then(data => FiveDayForecast.push(data))
    // .then(data => FiveDayForecast.push(data.list));
// console.log(FiveDayForecast);
// console.log(FiveDayForecast.length);


function check_array (value) {
    return Object.prototype.toString.apply(value) === '[object Array]';
}

console.log(check_array(FiveDayForecast)); // outputs: true

function findMatches(wordToMatch, weatherForecast) {
    return weatherForecast.filter(dataEntry => {
      // here we need to figure out if the city or state matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      // going to return true and show the object if the city name or the state name matches what was searched
      return dataEntry.dt_txt.match(regex);
    });
}

// JAN.17TH: this function and the forecastByDay = displayMatches(); works just fine in the console but apparently doesn't work in the javascript for some reason? WTF?
var forecastByDay = [];
function displayMatches() {
  const matchArray = findMatches("00:00:00", FiveDayForecast);
  return matchArray;
}
forecastByDay = displayMatches();

// for (let i = 0; i < FiveDayForecast.length; i++) {
//     console.log(i);
//     console.log(FiveDayForecast[i]);
// }

// FiveDayForecast.filter(dataEntry => (dataEntry.dt_txt.includes("00:00:00")));
// const result = FiveDayForecast.filter(dataEntry => (dataEntry.dt_txt == "2019-01-18 00:00:00"));
// console.log(result);
  
// console.log(FiveDayForecast);
// console.log(FiveDayForecast[0]);
// console.log(FiveDayForecast[6]);
// console.log(FiveDayForecast[14]);
// console.log(FiveDayForecast[22]);
// console.log(FiveDayForecast[30]);
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