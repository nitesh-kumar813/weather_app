import React, { useState, useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { PiWavesBold } from "react-icons/pi";
import { MdOutlineVisibility } from "react-icons/md";
import { BsThermometerSun } from "react-icons/bs";
import AirPollution from "./AirPollution";

const API_KEY = "cd531621cd2a52a0fb96bf76ac1464b7";

function TodaysForecast({ city, lat, lon }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        let apiUrl = "";
        if (city) {
          apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        } else if (lat && lon) {
          apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        } else {
          console.error("Invalid input: city or coordinates not provided.");
          return;
        }
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    fetchWeatherData();
  }, [city, lat, lon]);

  const formatTime = (timestamp) => {
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    return new Date(timestamp * 1000).toLocaleString("en-US", options);
  };

  const formatVisibility = (visibility) => {
    return (visibility / 1000).toFixed(1);
  };

  return (
    <div className="w-[85%] p-4 md:w-full lg:w-full h-auto lg:h-auto bg-[#2d2c2c74] rounded-[20px] flex flex-col justify-center items-center">
      <span className="w-[95%] mb-4 text-lg">Today's Highlights</span>
      <div className="w-[95%]">
        {/* Upper div */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <AirPollution lat={weatherData?.coord.lat} lon={weatherData?.coord.lon}/>
          <div className="rounded-lg bg-[#12111174] p-5">
            <span className="w-fit text-[#767676]">Sunrise & Sunset</span>
            <div className="bg-gree-400 h-auto w-full flex flex-row mt-5 justify-evenly">
              <div className="bg-re-400 flex flex-row ml-3 items-center w-[40%]">
                <BsSun size={40} />
                <div className="h-full w-fit ml-5 flex flex-col items-start">
                  <span className="text-xs text-[#767676]">Sunrise</span>
                  <span className="text-2xl mt-1">
                    {weatherData ? formatTime(weatherData.sys.sunrise) : "-"}
                  </span>
                </div>
              </div>
              <div className="bg-re-400 flex flex-row ml-3 items-center w-[40%]">
                <BsMoon size={40} />
                <div className="h-full w-fit ml-5 flex flex-col items-start">
                  <span className="text-xs text-[#767676]">Sunset</span>
                  <span className="text-2xl mt-1">
                    {weatherData ? formatTime(weatherData.sys.sunset) : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower div */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg bg-[#12111174] p-4">
            <span className="w-fit text-[#767676]">Humidity</span>
            <div className=" flex flex-row mx-5 items-center justify-between mt-5">
              <WiHumidity size={40} />
              <span className="h-full w-fit ml-5 text-2xl">{weatherData?.main.humidity}%</span>
            </div>
          </div>
          <div className="rounded-lg bg-[#12111174] p-4">
            <span className="w-fit text-[#767676]">Wind Speed</span>
            <div className=" flex flex-row mx-5 items-center justify-between mt-5">
              <PiWavesBold size={40} />
              <span className="h-full w-fit ml-5 text-2xl">
                {weatherData?.wind.speed.toFixed(0)}km/h
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-[#12111174] p-4">
            <span className="w-fit text-[#767676]">Visibility</span>
            <div className=" flex flex-row mx-5 items-center justify-between mt-5">
              <MdOutlineVisibility size={40} />
              <span className="h-full w-fit ml-5 text-2xl">
                {weatherData ? formatVisibility(weatherData.visibility) : "-"}km
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-[#12111174] p-4">
            <span className="w-fit text-[#767676]">Feels Like</span>
            <div className=" flex flex-row mx-5 items-center justify-between mt-5">
              <BsThermometerSun size={40} />
              <span className="h-full w-fit ml-5 text-2xl">
                {weatherData?.main.feels_like.toFixed(0)}&deg;C
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodaysForecast;
