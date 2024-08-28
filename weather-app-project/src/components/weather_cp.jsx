import React, { useEffect, useRef, useState } from "react";
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
    const inputRef = useRef();
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
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                tempurature: Math.floor(data.main.temp),
                location: data.name,
                icon:icon
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        search("Bangkok");
    }, []);

    return (
        <div className="mt-[100px] p-8 bg-gradient-to-r from-blue-500 to bg-purple-700 shadow-lg rounded-lg max-w-sm mx-auto">
            <div className="flex items-center gap-3 mb-4">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search"
                    className="h-10 w-full border border-gray-300 rounded-lg pl-4 text-gray-600 bg-white text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <img
                    src={search_icon}
                    alt="search icon"
                    onClick={() => search(inputRef.current.value)}
                    className="w-10 p-2 rounded-lg bg-white cursor-pointer hover:bg-blue-500"
                />
            </div>
            <img src={WeatherData.icon} alt="" className="w-24 mx-auto mb-4" />
            <p className="text-4xl text-center font-bold text-white mb-2">
                {WeatherData.tempurature}°c
            </p>
            <p className="text-2xl text-center text-white mb-6">
                {WeatherData.location}
            </p>
            <div className="flex justify-between text-white">
                <div className="flex items-center gap-2">
                    <img src={humidity_icon} alt="" className="w-6" />
                    <div>
                        <p className="text-lg font-medium">{WeatherData.humidity}%</p>
                        <span className="text-sm">Humidity</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <img src={wind_icon} alt="" className="w-6" />
                    <div>
                        <p className="text-lg font-medium">{WeatherData.windSpeed} km/h</p>
                        <span className="text-sm">Wind speed</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
