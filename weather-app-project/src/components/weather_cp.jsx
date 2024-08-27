import React, { useEffect, useState } from "react";
import './weather_cp.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {

    const [WeatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
        "50d": wind_icon,
        "50n": wind_icon,
    };

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                tempurature: Math.floor(data.main.tempurature),
                location: data.name
            })

        } catch (error) {

        }
    }
    useEffect(() => {
        search("Bangkok")
    }, [])

    return ( 
        <div className="weather">
            <div className="search-bar">
                <input type="text" placeholder="Search" />
                <img src={search_icon} alt="search icon" />
            </div>
            <img src={clear_icon} alt="" className="weather-icon" />
            <p className="temperature">{WeatherData.tempurature}°c</p>
            <p className="location">{WeatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{WeatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{WeatherData.windSpeed}km/h</p>
                        <span>Wind speed</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather