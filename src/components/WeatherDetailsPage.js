// WeatherDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function WeatherDetailsPage() {
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '5c92651420b4335b277eb2c72a7ed792'; 

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [city, apiKey]);

  return (
    <div className="container weather-details">
      <h2>Weather Details for {city}</h2>
      {weatherData && (
        <div>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          {/* Add more weather details here */}
        </div>
      )}
    </div>
  );
}

export default WeatherDetailsPage;
