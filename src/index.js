import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import sunnyLogo from './sunny-icon.png';
import cloudyLogo from './cloudy-icon.png';
import rainyLogo from './rainy-icon.png';
import snowyLogo from './snowy-icon.png';

/** @function */
function DayOfTheWeek(props) {
    return <p className="forecast-date"><em>{props.day}</em></p>
}

/** @function */
function WeatherIcon(props) {
    return <span className="weather-icon"><img src={props.icon} alt="Weather icon"/></span>
}

/** @function */
function ForecastTemp(props) {
    return <p className="singleday-temps">
            <span className="singleday-high-temp">{props.highTemp}&#176;</span>
            <span className="singleday-low-temp"><em>{props.lowTemp}&#176;</em></span>
           </p>
}

/**
 * @class 
 * @classdesc Renders a single day's forecast which contains the date, the weather condition icon, and high and low temperatures
*/
class SingleDayForecast extends Component {
    render() {
      return (
              <div className="single-day-forecast">
                <DayOfTheWeek day={this.props.day} />
                <WeatherIcon icon={this.props.icon} />
                <ForecastTemp
                    lowTemp={this.props.lowTemp}
                    highTemp={this.props.highTemp}
                />
              </div>
      );
    }
}

/**
 * @class 
 * @classdesc Renders 5 SingleDayForecast Components, holds all weather data in state, also fetches weather data
*/
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

    /**
     * @description fetches weather data into an array and updates the state variables with the new data
     * @async
    */
    handleClick = async () => {
        try {
            // fetch weather data and push it to FiveDayForecast array
            const weatherData = 'https://api.openweathermap.org/data/2.5/forecast?q=Whitehorse,ca&units=metric&appid={myapikey}';
            const FiveDayForecast = [];
            var response = await fetch(weatherData);
            var json = await response.json();
            // filter the json data down to only weather data at 12pm for each day
            var filteredJson = json.list.filter(dataEntry => (dataEntry.dt_txt.includes("12:00:00")));
            FiveDayForecast.push(...filteredJson);

            const weatherIcons = {
                Clear: `${sunnyLogo}`,
                Clouds: `${cloudyLogo}`,
                Rain: `${rainyLogo}`,
                Snow: `${snowyLogo}`
            };
            // update state with new weather data
            this.setState({
                daysOfTheWeek: FiveDayForecast.map(day =>
                    day.dt_txt.split("12:00:00").join("")
                ),
                weatherIcons: FiveDayForecast.map(
                  icon => weatherIcons[icon.weather[0].main] || sunnyLogo
                ),
                temps: FiveDayForecast.map(temperature => {
                    return {
                        highTemp: temperature.main.temp_max,
                        lowTemp: temperature.main.temp_min
                    }
                })
              });
            
        } catch(e) {
            console.log("Data didn't load", e);
        }       
    }

    /**
     * @description renders five SingleDayForecast componenets and a button that retrievs the weather data when clicked
    */
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