import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchWeatherData } from'../utils/utils';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

function HoursForecast({ city, lat, lon, unit }) {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        let apiUrl = "";
        if (city) {
          apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
        } else if (lat && lon) {
          apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        } else {
          console.error("Invalid input: city or coordinates not provided.");
          return;
        }

        const data = await fetchWeatherData(apiUrl);
        setForecastData(data);
        toast.success("Hourly forecast loaded successfully.");
       } catch (error) {
      console.error("Error fetching hourly forecast data:", error.message);
      toast.error(error.message || "Failed to fetch hourly forecast data. Please try again.");
    }
    };

    fetchForecastData();
  }, [city, lat, lon]);

  const convertTemperature = (tempCelsius) => {
    return unit === "C" ? tempCelsius : (tempCelsius * 9/5) + 32;
  };

  const formatTime = (dt_txt) => {
    const date = new Date(dt_txt);
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; 
    return `${hours} ${ampm}`;
  };

  const filteredData = forecastData?.list?.filter((item) => {
    const date = new Date(item.dt_txt);
    const hours = date.getHours();
    return hours % 3 === 0;
  }) || [];

  return (
    <div className="w-[84%] md:w-full lg:w-full h-auto bg-[#2d2c2c74] p-4 rounded-[20px]">
      <div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-4">
        {filteredData.length > 0 ? (
          filteredData.slice(0, 8).map((item, index) => (
            <div key={index} className="rounded-lg bg-[#12111174] mb-4 flex flex-col items-center">
              <span className="my-2 mb-0">{formatTime(item.dt_txt)}</span>
              <img
                src={iconUrlFromCode(item.weather[0].icon)}
                alt={item.weather[0].description}
                className="bg-ed-400 h-13 w-20 p-0"
              />
              <span className="my-2 mt-0">
              {Math.round(convertTemperature(item.main.temp))}&deg;{unit}
              </span>
            </div>
          ))
        ) : (
          <div>Loading hourly forecast data...</div> 
        )}
      </div>
    </div>
  );
}

export default HoursForecast;
