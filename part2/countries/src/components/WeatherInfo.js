import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo =({ location }) => {
  const [ weatherData, setWeatherData ] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${location}`)
      .then(response => {
        setWeatherData({
          temperature: response.data.current.temperature,
          icon: response.data.current.weather_icons,
          windSpeed: response.data.current.wind_speed,
          windDirection: response.data.current.wind_dir,
        });
      });
  },[location, api_key]);
  return (
    <div>
      <h3>Weather in {location}</h3>
      <p>
        <b>Temperature: </b> {weatherData.temperature} Celcius
      </p>
      <img 
        src={weatherData.icon}
        alt="Weather status icon"
        style={{maxWidth:200, height:'auto'}}
      />
      <p>
        <b>Wind: </b> {weatherData.windSpeed} mph direction {weatherData.windDirection}
      </p>
    </div>
  );
};

export default WeatherInfo;
