import React, { useState, useEffect } from "react";
import { LuWind } from "react-icons/lu";




function AirPollution({ lat, lon }) {
    const [pollutionData, setPollutionData] = useState(null);
    const API_KEY = "cd531621cd2a52a0fb96bf76ac1464b7";
    
  useEffect(() => {
    const fetchPollutionData = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch pollution data");
        }
        const data = await response.json();
        setPollutionData(data);
      } catch (error) {
        console.error("Error fetching pollution data: ", error);
      }
    };

    fetchPollutionData();
  }, [lat, lon]);
  return (
      <>
          <div className="rounded-lg bg-[#12111174] p-5">
            <span className="w-fit text-[#767676]">Air Quality Index</span>
            <div className="h-auto w-full flex flex-row mt-7">
              <LuWind size={50} className="ml-4" />
              <div className="bg-gree-400 w-full h-auto ml-5 flex flex-row justify-evenly">
                <div className="h-full w-fit flex flex-col items-center">
                  <span className="text-xs text-[#767676]">PM25</span>
                  <span className="text-xl mt-1">{pollutionData?.list[0].components.pm2_5.toFixed(1)}</span>
                </div>
                <div className="h-full w-fit flex flex-col items-center">
                  <span className="text-xs text-[#767676]">SO2</span>
                  <span className="text-xl mt-1">{pollutionData?.list[0].components.so2.toFixed(1)}</span>
                </div>
                <div className="h-full w-fit flex flex-col items-center">
                  <span className="text-xs text-[#767676]">NO2</span>
                  <span className="text-xl mt-1">{pollutionData?.list[0].components.no2.toFixed(1)}</span>
                </div>
                <div className="h-full w-fit flex flex-col items-center">
                  <span className="text-xs text-[#767676]">O3</span>
                  <span className="text-xl mt-1">{pollutionData?.list[0].components.o3.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
      </>
  )
}

export default AirPollution
