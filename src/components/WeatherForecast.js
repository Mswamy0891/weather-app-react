// components/WeatherForecast.js
import React, { useState } from 'react';
import { getWeatherForecast } from '../services/WeatherService';
import './WeatherForecast.css'; // Assuming you're using CSS for styling

const WeatherForecast = () => {
    const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchWeather = async () => {
        setLoading(true);
        try {
            const data = await getWeatherForecast(cityName);
            setWeatherData(data);
        } catch (error) {
            alert('Error fetching weather data');
        }
        setLoading(false);
    };

    return (
        <div className="weather-container">
            <div className="search-bar">
                <span>Weather in your city</span>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                />
                <button onClick={fetchWeather}>Search</button>
            </div>
            {loading && <div className="loader">Loading...</div>}
            <div className="weather-results">
                {weatherData.map((item, index) => (
                    <table key={index} className="weather-card">
                    <tr>
                        <th colspan="2" class="header">Date: {item.dt_txt.split(' ')[0]}</th>
                    </tr>
                    <tr>
                        <td colspan="2" class="sub-header">Temperature</td>
                    </tr>
                    <tr>
                        <td class="sub-header">Min</td>
                        <td class="sub-header">Max</td>
                    </tr>
                    <tr>
                        <td>{item.main.temp_min}°C</td>
                        <td>{item.main.temp_max}°C</td>
                    </tr>
                    <tr>
                        <td class="sub-header">Pressure</td>
                        <td >{item.main.pressure} hPa</td>
                    </tr>
                  
                    <tr>
                        <td class="sub-header">Humidity</td>
                        <td >{item.main.humidity}%</td>
                    </tr>
                  
                </table>
                  
                ))}
            </div>
        </div>
    );
};

export default WeatherForecast;
