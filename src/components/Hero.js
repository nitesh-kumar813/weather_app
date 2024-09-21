import React, { useState, useEffect } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import Forecast from "./Forecast";
import TodaysForecast from "./TodaysForecast";
import HoursForecast from "./HoursForecast";
import WindForecast from "./WindForecast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchWeatherData, formatDate } from "../utils/utils";

function Hero({ query }) {
  const [weatherData, setWeatherData] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [unit, setUnit] = useState("C"); 

  // Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  // Tem. conversion 
  const convertTemperature = (temp) => {
    return unit === "C" ? temp : (temp * 9) / 5 + 32;
  };

  const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        const { q, lat, lon } = query;
        let apiUrl = "";

        if (q) {
          apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}&units=metric`;
        } else if (lat && lon) {
          apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        }

        const data = await fetchWeatherData(apiUrl);
        setWeatherData(data);

        if (data && data.dt) {
          setCurrentDate(formatDate(data.dt));
        }

        toast.success("Weather data loaded successfully.");
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
        toast.error(
          error.message || "Failed to fetch weather data. Please try again."
        );
      }
    };

    if (query.q || (query.lat && query.lon)) {
      getWeatherData();
    }
  }, [query]);

  return (
    <div className="flex flex-col lg:flex-row md:flex-row w-full bg-zinc-900 text-white mt-4">
      <div className="w-full lg:w-[28%] md:w-[30%] h-auto lg:h-screen bg-zinc-900 flex flex-col items-center">
        <div className="w-[85%] h-auto bg-[#2d2c2c74] rounded-[20px] flex flex-col items-start p-6 px-8">
          <div className="flex flex-row justify-between w-full">
            <span className="w-fit mb-2 text-lg">Now</span>
            <div className="flex justify-center items-center h-9 mr-8 text-sm">
              <button
                onClick={toggleUnit}
                className="bg-blue-500 text-white py-1 px-3 rounded-md whitespace-nowrap"
              >
                Switch to {unit === "C" ? "F" : "C"}
              </button>
            </div>
          </div>

          <div className="text-6xl md:text-4xl lg:text-6xl w-full flex flex-row justify-around item-center font-normal">
            <span className="mr-2 flex items-center">
              {weatherData?.main?.temp &&
                convertTemperature(weatherData.main.temp).toFixed(0)}
              &deg;{unit}
            </span>
            {weatherData && (
              <img
                src={iconUrlFromCode(weatherData.weather[0].icon)}
                alt={weatherData.weather[0].description}
                className="h-13 p-0"
              />
            )}
          </div>
          <span className="w-fit mt-2 mb-3 text-sm ">
            {weatherData?.weather[0].main}
          </span>
          <div className="bg-[#6d6a6a74] h-[1.5px] w-full text-transparent">
            .
          </div>
          <div className="w-fit mt-2 text-sm flex flex-row ">
            <LuCalendarDays size={17} />
            <span className="ml-2">{currentDate}</span>
          </div>
          <div className="w-fit mt-2 text-sm flex flex-row ">
            <IoLocationOutline size={17} />
            <span className="ml-2">
              {weatherData?.name}, {weatherData?.sys?.country}
            </span>
          </div>
        </div>
        <span className="w-4/5 h-8 my-4 text-lg">5 Days Forecast</span>
        <Forecast city={query.q} lat={query.lat} lon={query.lon} unit={unit} />
      </div>

      <div className="w-full md:w-[67%] lg:w-[69%] h-auto lg:h-full bg-zinc-900 flex flex-col mt-8 md:mt-0 lg:mt-0 items-center">
        <TodaysForecast city={query.q} lat={query.lat} lon={query.lon} unit={unit} />
        <span className="flex text-lg w-[80%] md:w-[95%] my-4">
          Today at
        </span>
        <HoursForecast city={query.q} lat={query.lat} lon={query.lon} unit={unit} />
        <WindForecast city={query.q} lat={query.lat} lon={query.lon} unit={unit} />

      </div>
    </div>
  );
}

export default Hero;

