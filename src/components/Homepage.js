import React, { useState, useEffect } from 'react';
import search from '../images/search.svg';
import location from '../images/location.svg';
import thermo from '../images/thermo.svg';
import clear from '../images/clear.svg';


function Homepage(props) { 
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState();
  const [forecast, setForecast] = useState([
    { 'temp': 11, 'weather': 'clear'},
    { 'temp': 14, 'weather': 'rainy'},
    { 'temp': 18, 'weather': 'clowdy'},
    { 'temp': 11, 'weather': 'clear'},
    { 'temp': 16, 'weather': 'clear'},
    { 'temp': 15, 'weather': 'rainy'},
  ]);
  const [cityTime, setCityTime] = useState(null); // Declare cityTime state
  const apiKey = '5c92651420b4335b277eb2c72a7ed792'; 

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  

  useEffect(() => {
    if (weatherData) {
      const timezoneOffsetSeconds = weatherData.timezone; // Time zone offset for the city in seconds
      const currentUTC = new Date(Date.now()); // Get current UTC time
      const offsetMilliseconds = timezoneOffsetSeconds * 1000; // Convert seconds to milliseconds
      const cityTime = new Date(currentUTC.getTime() + offsetMilliseconds);
      setCityTime(cityTime.toLocaleString('en-GB', { timeZone: 'UTC' })); // Format city time and set cityTime state
      props.setShowNav(e => !e)
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDayIndex = cityTime.getDay();
        // Rearrange the days of the week starting from the current day
      const daysStartingFromToday = [
        ...daysOfWeek.slice(currentDayIndex), // Slice from current day to end of the week
        ...daysOfWeek.slice(0, currentDayIndex) // Slice from beginning of the week to current day
      ];
      setForecast(prev => prev.map(obj => {
        return {
          ...obj, 'day': daysStartingFromToday[forecast.indexOf(obj) + 1]
        };
      }))
    }
  }, [weatherData]);
  

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleChange}
        />
        <button type="submit"><img src={search} width="80%"/></button>
      </form>

      {weatherData && (
        <>
        <div className="main">
          <div className="yesterday">

          </div>
          <div className="weather-details">
            <div className="location">
              <span>{city}</span>
              <img src={location} width="30px"/>
            </div>
            <div className="temperature">
              <img src={thermo} width='14px'/>
              <div>
              {weatherData.main.temp}°C <br />  {weatherData.weather[0].description}

              </div>
              <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].main}/>
              </div>
            {cityTime && ( 
              <div className="datetime">{cityTime.toLocaleString()}</div>
            )}
            <div className="other-status">
              <div>Humidity <br/>{weatherData.main.humidity}%</div>
              <div>Visibility <br/>{weatherData.visibility / 1000} km</div>
              <div>Air Pressure <br/>{weatherData.main.pressure} hPa</div>
              <div>Wind <br/>{weatherData.wind.speed} mph</div>
            </div>
          </div>
          <div className="tomorrow">
            
          </div>
        </div>
        <div className="forecast">
        {
          forecast.map(
            e => <div className='forecast-element'>
            <div>{e.day}</div>
            <div>{e.weather}</div>
            <div>{e.temp}°C</div>
        </div>
          )
        }
      </div>
      </>

      )}
      
    </div>
    
  );
}

export default Homepage;
