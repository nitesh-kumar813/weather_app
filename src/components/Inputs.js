import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { toast } from "react-toastify";
import logo from "../images/Digital_Paani-Logo.png";

function Inputs({ setQuery }) {
  const [city, setCity] = useState("");

  const handleSearchClick = async () => {
    if (city.trim() === "") {
      toast.error("Please enter a city name.");
      return;
    }

    console.log("City:", city); 

    try {
      const apiKey = "cd531621cd2a52a0fb96bf76ac1464b7"; 
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
      }
      
      const data = await response.json();
      setQuery({ q: city });
      toast.success(`Weather data for ${city} fetched successfully.`);
    } catch (error) {
      toast.error("Failed to fetch weather data.");
    }
  };

  const handleLocationClick = () => {
    if (window.navigator.geolocation) {
      toast.info("Fetching user's location...");
      console.log("Fetching user's location...");
      window.navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude: lat, longitude: lon } = position.coords;
          console.log(`User's location - Latitude: ${lat}, Longitude: ${lon}`);
          const apiKey = "cd531621cd2a52a0fb96bf76ac1464b7"; // Replace with your API key
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
          const response = await fetch(apiUrl);
          
          if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
          }
  
          const data = await response.json();
          setQuery({ lat, lon });
          toast.success("User's location fetched successfully.");
        } catch (error) {
          toast.error("Failed to fetch user's location.");
        }
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };
  
  
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="flex flex-row justify-evenly w-screen" data-search-view>
      <div className="w-2/6 ml-4 md:w-1/5 md:ml-4 flex justify-center">
        <img src={logo} alt="" className="h-16 md:h-20 lg:h-24" />
      </div>

      <div className="flex flex-row w-full justify-center ">
        <div className="flex flex-row w-11/12 md:w-3/4 lg:w-2/3 xl:w-w-3/5 items-center justify-center">
          <div className="flex flex-row w-full items-center justify-center rounded-full bg-[#45454572] px-4 shadow-xl">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              type="text"
              placeholder="Search for city...."
              className="text-xl font-light text-white p-2 w-full md:w-5/6 focus:outline-none capitalize placeholder:lowercase bg-[#2c2c2c72]"
            />
            <div className="px-7 py-2">
              <UilSearch
                size={27}
                className="text-white cursor-pointer transition ease-out hover:scale-125"
                onClick={handleSearchClick}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-auto items-center justify-center md:w-2/6 lg:w-1/4  mr-3 md:mr-5">
        <div
          className="flex flex-row h-11 w-auto items-center justify-center px-5 md:px-2 lg:px-5 bg-[#2d2c2c74] rounded-full cursor-pointer"
          onClick={handleLocationClick}
        >
          <UilLocationPoint
            size={25}
            className="text-white cursor-pointer transition ease-out hover:scale-125"
          />
          <span className="flex-row text-white ml-2 hidden md:inline md:text-sm ">
            Current Location
          </span>
        </div>
      </div>
    </div>
  );
}

export default Inputs;

;
