import React, { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa";

const API_KEY = "cd531621cd2a52a0fb96bf76ac1464b7";

function WindForecast({ city, lat, lon }) {
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

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch forecast data");
        }
        const data = await response.json();
        const filteredData = data.list.filter((item) => {
          const date = new Date(item.dt_txt);
          const hours = date.getHours();
          return hours % 3 === 0;
        });
        setForecastData(filteredData);
      } catch (error) {
        console.error("Error fetching forecast data: ", error);
      }
    };

    fetchForecastData();
  }, [city, lat, lon]);

  const formatTime = (dt_txt) => {
    const date = new Date(dt_txt);
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours} ${ampm}`;
  };

  return (
    <>
      <div className="w-[84%] md:w-full lg:w-full h-auto bg-[#2d2c2c74] p-4 rounded-[20px] mt-4">
        <div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-4">
          {forecastData.slice(0, 8).map((item, index) => (
            <div
              key={index}
              className="rounded-lg bg-[#12111174] mb-4 flex flex-col items-center"
            >
              <span className="my-3 ">{formatTime(item.dt_txt)}</span>
              <FaLocationArrow
                size={30}
                style={{ transform: `rotate(${item.wind.deg}deg)` }}
                className=" text-blue-600"
              />
              <span className="my-3 ">
                {Math.round(item.wind.speed * 3.6)} km/h
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WindForecast;
