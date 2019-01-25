import React, { Component } from 'react';
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

var GetWeatherForecast = createReactClass({
    render: function() {
        return <button className="get-weather-forecast-button" onClick={() => this.props.handleClick()}>
          Get Weather Forecast
        </button>
    }
})

class SingleDayForecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: "Day of the week",
            weatherIcon: `${sunnyLogo}`,
            temp: {
                highTemp: 0,
                lowTemp: 0
            }
        }
    }

    handleClick = async () => {
        try {
            const weatherData = 'https://api.openweathermap.org/data/2.5/forecast?q=Whitehorse,ca&units=metric&appid=1f1128a9adbf296b8644ae2ac6f80fa1';
            const FiveDayForecast = [];
            
            var response = await fetch(weatherData);
            var json = await response.json();
            var filteredJson = json.list.filter(dataEntry => (dataEntry.dt_txt.includes("00:00:00")));
            FiveDayForecast.push(...filteredJson);
            console.log("FiveDayForecast in async function:");
            console.log(FiveDayForecast);

            console.log('this = ' + this);
            for (let i = 0; i < FiveDayForecast.length; i++) {
                this.setState({
                    day: FiveDayForecast[i].dt_txt.split('00:00:00').join(''),
                    temp: {
                        highTemp: FiveDayForecast[i].main.temp_max,
                        lowTemp: FiveDayForecast[i].main.temp_min
                    }
                });
                var weatherIcon = FiveDayForecast[i].weather[0].main;
                switch (weatherIcon) {
                    case "Clear":
                        this.setState({
                            weatherIcon: `${sunnyLogo}`
                        });
                        break;
                    case "Clouds":
                        this.setState({
                            weatherIcon: `${cloudyLogo}`
                        });
                        break;
                    case "Rain":
                        this.setState({
                            weatherIcon: `${rainyLogo}`
                        });
                        break;
                    case "Snow":
                        this.setState({
                            weatherIcon: `${snowyLogo}`
                        });
                        break;                                                        
                    default:
                        this.setState({
                            weatherIcon: `${sunnyLogo}`
                        });                          
                }
            }        
        } catch(e) {
            console.log("Data didn't load", e);
        }        
    }

    render() {
      return (
              <div className="single-day-forecast">
                <Day day={this.state.day} />
                <WeatherIcon icon={this.state.weatherIcon} />
                <ForecastTemp
                    lowTemp={this.state.temp.lowTemp}
                    highTemp={this.state.temp.highTemp}
                />
                <button onClick={() => this.handleClick()}>Get Weather Forecast</button>
              </div>
      );
    }
  }
 // on page load, grab weather data and convert it to json using fetch. 
 // Update the each SingleDayForecast component's props objects to be new values
 // Rerender the ReactDOM asynch way
ReactDOM.render(<div className="five-day-forecast">
                    <SingleDayForecast day="Mon" icon={sunnyLogo} lowTemp={14} highTemp={20} />
                    <SingleDayForecast day="Tue" icon={cloudyLogo} lowTemp={10} highTemp={14} />
                    <SingleDayForecast day="Wed" icon={sunnyLogo} lowTemp={16} highTemp={23} />
                    <SingleDayForecast day="Thu" icon={rainyLogo} lowTemp={8} highTemp={5} />
                    <SingleDayForecast day="Fri" icon={snowyLogo} lowTemp={-2} highTemp={3} />
                    <div className="clear"></div>                   
                </div>, document.querySelector('#root'));