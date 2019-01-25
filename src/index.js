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

class SingleDayForecast extends Component {
    render() {
      return (
              <div className="single-day-forecast">
                <Day day={this.props.day} />
                <WeatherIcon icon={this.props.icon} />
                <ForecastTemp
                    lowTemp={this.props.lowTemp}
                    highTemp={this.props.highTemp}
                />
              </div>
      );
    }
}

class FiveDayForecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            daysOfTheWeek: Array(5).fill('Day of the week'),
            weatherIcons: Array(5).fill(`${sunnyLogo}`),
            temps: Array(5).fill({
                    highTemp: 0,
                    lowTemp: 0
                })
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

            // collect data to put into state
            const { daysOfTheWeek, weatherIcons, temps } = this.state;
            for (let i = 0; i < FiveDayForecast.length; i++) {
                daysOfTheWeek[i] = FiveDayForecast[i].dt_txt.split('00:00:00').join('');

                let weatherIcon = FiveDayForecast[i].weather[0].main;
                switch (weatherIcon) {
                    case "Clear":
                        weatherIcons[i] = `${sunnyLogo}`;
                        break;
                    case "Clouds":
                        weatherIcons[i] = `${cloudyLogo}`;
                        break;
                    case "Rain":
                        weatherIcons[i] = `${rainyLogo}`;
                        break;
                    case "Snow":
                        weatherIcons[i] = `${snowyLogo}`;
                        break;                                                        
                    default:
                        weatherIcons[i] = `${sunnyLogo}`;                       
                }
                console.log('blah');
                console.log(temps[i])
                temps[i].highTemp = FiveDayForecast[i].main.temp_max;
                temps[i].lowTemp = FiveDayForecast[i].main.temp_min; 
                console.log(FiveDayForecast[i].main.temp_max)
                // console.log(FiveDayForecast[i].main.temp_min)
                console.log(temps);           
            }
            console.log('DATA AFTER COLLECTING IT:')
            console.log(daysOfTheWeek);
            console.log(weatherIcons);
            console.log(temps);
            // put this new data into state
            this.setState({
                daysOfTheWeek, weatherIcons, temps
            })
        } catch(e) {
            console.log("Data didn't load", e);
        }       
    }

    render() {
        return (
                <div>
                    <div className="five-day-forecast">
                        <SingleDayForecast
                            day={this.state.daysOfTheWeek[0]}
                            icon={this.state.weatherIcons[0]}
                            lowTemp={this.state.temps[0].lowTemp}
                            highTemp={this.state.temps[0].highTemp}
                        />
                        <SingleDayForecast
                            day={this.state.daysOfTheWeek[1]}
                            icon={this.state.weatherIcons[1]}
                            lowTemp={this.state.temps[1].lowTemp}
                            highTemp={this.state.temps[1].highTemp}
                        /> 
                        <SingleDayForecast
                            day={this.state.daysOfTheWeek[2]}
                            icon={this.state.weatherIcons[2]}
                            lowTemp={this.state.temps[2].lowTemp}
                            highTemp={this.state.temps[2].highTemp}
                        /> 
                        <SingleDayForecast
                            day={this.state.daysOfTheWeek[3]}
                            icon={this.state.weatherIcons[3]}
                            lowTemp={this.state.temps[3].lowTemp}
                            highTemp={this.state.temps[3].highTemp}
                        /> 
                        <SingleDayForecast
                            day={this.state.daysOfTheWeek[4]}
                            icon={this.state.weatherIcons[4]}
                            lowTemp={this.state.temps[4].lowTemp}
                            highTemp={this.state.temps[4].highTemp}
                        />                                                                                              
                        <div className="clear"></div>
                    </div>
                    <button onClick={() => this.handleClick()}>Get Weather Forecast</button>
                </div>
        );
    }
}

// -----------------

ReactDOM.render(<div className="weather-app">
                    <FiveDayForecast/>                
                </div>, document.querySelector('#root'));