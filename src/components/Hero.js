import React, { useState, useEffect } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import Forecast from "./Forecast";
import TodaysForecast from "./TodaysForecast";
import HoursForecast from "./HoursForecast";
import WindForecast from "./WindForecast";

function Hero({ query }) {
  const [weatherData, setWeatherData] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const API_KEY = "cd531621cd2a52a0fb96bf76ac1464b7";
        const { q, lat, lon } = query;
        let apiUrl = "";
        if (q) {
          apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}&units=metric`;
        } else if (lat && lon) {
          apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);

        const date = new Date(data.dt * 1000);
        const options = { weekday: "short", day: "numeric", month: "short" };
        setCurrentDate(date.toLocaleDateString("en-US", options));
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    fetchWeatherData();
  }, [query]);

  return (
    <div className="flex flex-col lg:flex-row md:flex-row w-full  bg-zinc-900 text-white mt-4">
      <div className="w-full lg:w-[28%] md:w-[30%] h-auto lg:h-screen bg-zinc-900 flex flex-col items-center">
        <div className="w-[85%] h-auto bg-[#2d2c2c74] rounded-[20px] flex flex-col items-start p-6 px-8">
          <span className="w-fit mb-2 text-lg">Now</span>
          <div className="text-6xl md:text-4xl lg:text-6xl  w-full flex flex-row justify-around item-center font-normal ">
            <span className="mr-2 flex items-center">
              {weatherData?.main.temp.toFixed(0)}&deg;C
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
            <IoLocationOutline size={17} />{" "}
            <span className="ml-2">
              {weatherData?.name}, {weatherData?.sys.country}
            </span>
          </div>
        </div>
        <span className="w-4/5 h-8 my-4 text-lg">5 Days Forecast</span>
        <Forecast city={query.q} lat={query.lat} lon={query.lon} />
      </div>

      <div className="w-full md:w-[67%] lg:w-[69%] h-auto lg:h-full bg-zinc-900 flex flex-col mt-8 md:mt-0 lg:mt-0  items-center">
        <TodaysForecast city={query.q} lat={query.lat} lon={query.lon} />
        <span className="flex text-lg w-[80%] md:w-[95%] my-4 bg-gren-400">
          Today at
        </span>
        <HoursForecast city={query.q} lat={query.lat} lon={query.lon} />
        <WindForecast city={query.q} lat={query.lat} lon={query.lon}/>
      </div>
    </div>
  );
}

export default Hero;
