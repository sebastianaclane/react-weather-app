import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import sunnyLogo from './sunny-icon.png';
import cloudyLogo from './cloudy-icon.png';
import rainyLogo from './rainy-icon.png';
import snowyLogo from './snowy-icon.png';
var createReactClass = require('create-react-class');

var Day = createReactClass({
    render: function() {
        return <p className="forecast-date"><em>{this.props.day}</em></p>
    }
})

var WeatherIcon = createReactClass({
    render: function() {
        return <span className="weather-icon"><img src={this.props.icon} alt="Weather icon"/></span>
    }
})

var ForecastTemp = createReactClass({
    render: function() {
        return <p className="singleday-temps"><span className="singleday-high-temp">{this.props.highTemp}&#176;</span> <span className="singleday-low-temp"><em>{this.props.lowTemp}&#176;</em></span></p>
    }
})

const weatherData = 'https://api.openweathermap.org/data/2.5/forecast?q=Whitehorse,ca&units=metric&appid={myapikey}';
const FiveDayForecast = [];

async function retrieveWeatherData() {
    try {
        var response = await fetch(weatherData);
        var json = await response.json();
        var filteredJson = json.list.filter(dataEntry => (dataEntry.dt_txt.includes("00:00:00")));
        FiveDayForecast.push(...filteredJson);
        console.log("FiveDayForecast in async function:");
        console.log(FiveDayForecast);
        
        // put data where I want it in the app
        var singleDayForecasts = document.querySelectorAll('.single-day-forecast .singleday-temps');
        var weatherIcons = document.querySelectorAll('.weather-icon');
        var forecastDates = document.querySelectorAll('.forecast-date');

        for (let i = 0; i < FiveDayForecast.length; i++) {
            singleDayForecasts[i].innerHTML = `<span className="singleday-high-temp">${FiveDayForecast[i].main.temp_max}&#176;</span> <span className="singleday-low-temp"><em>${FiveDayForecast[i].main.temp_min}&#176;</em></span>`;

            var weatherIcon = FiveDayForecast[i].weather[0].main;
            switch (weatherIcon) {
                case "Clear":
                    weatherIcons[i].innerHTML = `<img src=${sunnyLogo} className="weather-icon" alt="Weather icon"/>`
                    break;
                case "Clouds":
                    weatherIcons[i].innerHTML = `<img src=${cloudyLogo} className="weather-icon" alt="Weather icon"/>`
                    break;
                case "Rain":
                    weatherIcons[i].innerHTML = `<img src=${rainyLogo} className="weather-icon" alt="Weather icon"/>`
                    break;
                case "Snow":
                    weatherIcons[i].innerHTML = `<img src=${snowyLogo} className="weather-icon" alt="Weather icon"/>`
                    break;                                                        
                default:
                    weatherIcons[i].innerHTML = `<img src=${sunnyLogo} className="weather-icon" alt="Weather icon"/>`                            
            }

            forecastDates[i].innerHTML = `<em>${FiveDayForecast[i].dt_txt.split('00:00:00').join('')}</em>`;
        }                

    } catch(e) {
        console.log("Data didn't load", e);
    }
}
retrieveWeatherData();

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
 // on page load, grab weather data and convert it to json using fetch. 
 // Update the each SingleDayForecast component's props objects to be new values
 // Rerender the ReactDOM asynch way
var a = 18;
ReactDOM.render(<div className="five-day-forecast">
                    <SingleDayForecast day="Mon" icon={sunnyLogo} lowTemp={14} highTemp={20} />
                    <SingleDayForecast day="Tue" icon={cloudyLogo} lowTemp={10} highTemp={14} />
                    <SingleDayForecast day="Wed" icon={sunnyLogo} lowTemp={16} highTemp={23} />
                    <SingleDayForecast day="Thu" icon={rainyLogo} lowTemp={8} highTemp={5} />
                    <SingleDayForecast day="Fri" icon={snowyLogo} lowTemp={-2} highTemp={3} />
                    <div className="clear"></div>                   
                </div>, document.querySelector('#root'));