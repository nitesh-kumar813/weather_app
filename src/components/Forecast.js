import React, { useState, useEffect } from "react";



const API_KEY = "cd531621cd2a52a0fb96bf76ac1464b7";

function Forecast({ city, lat, lon }) {
  const [forecastData, setForecastData] = useState(null);

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
        setForecastData(data);
      } catch (error) {
        console.error("Error fetching forecast data: ", error);
      }
    };

    fetchForecastData();
  }, [city, lat, lon]);
  
    const convertTimestampToDayOfWeek = (timestamp) => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const date = new Date(timestamp * 1000);
      return days[date.getDay()];
    };
  
    const convertTimestampToMonthName = (timestamp) => {
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const date = new Date(timestamp * 1000);
      return months[date.getMonth()];
    };
     
    const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;
    // Filter forecast data to include only the next 5 days
    const filteredForecastData = forecastData
      ? forecastData.list.filter((item, index) => index < 40 && index % 8 === 0)
      : null;
  
    return (
      <div className="w-[85%] h-auto bg-[#2d2c2c74] rounded-[20px] px-6 pt-7">
        {filteredForecastData &&
          filteredForecastData.map((item, index) => (
            <div key={index} className="w-full h-auto flex flex-row justify-between items-center mb-6 ">
              <div className="flex flex-row items-center">
              <img
                src={iconUrlFromCode(item.weather[0].icon)}
                alt={item.weather[0].description}
                className="h-10 md:h-8 lg:h-10 "
              />
                <span className="text-lg md:text-base lg:text-xl ml-2 flex">
                {Math.round(item.main.temp)}&deg;
                </span>
              </div>
              <div className="text-sm text-[#767676]">
                <span>{item.dt_txt.substring(8, 10)}</span> 
                <span>{convertTimestampToMonthName(item.dt)}</span> 
              </div>
              <div className="text-sm text-[#767676]">
                {convertTimestampToDayOfWeek(item.dt)}
              </div>
            </div>
          ))}
      </div>
    );
  }
  
  export default Forecast;







// cd531621cd2a52a0fb96bf76ac1464b7