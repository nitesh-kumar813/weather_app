import React, { useState, useEffect } from "react";

const API_KEY = "cd531621cd2a52a0fb96bf76ac1464b7";

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

function HoursForecast({ city, lat, lon }) {
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
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours} ${ampm}`;
  };

  return (
    <>
      <div className="w-[84%] md:w-full lg:w-full h-auto bg-[#2d2c2c74] p-4 rounded-[20px]">
        <div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-4">
          {forecastData.slice(0, 8).map((item, index) => (
            <div key={index} className="rounded-lg bg-[#12111174] mb-4 flex flex-col items-center">
              <span className="my-2 mb-0">{formatTime(item.dt_txt)}</span>
              <img
                src={iconUrlFromCode(item.weather[0].icon)}
                alt={item.weather[0].description}
                className="bg-ed-400 h-13 w-20 p-0"
              />
              <span className="my-2 mt-0">
                {Math.round(item.main.temp)}&deg;C
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HoursForecast;
