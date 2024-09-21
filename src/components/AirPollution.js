import React, { useState, useEffect } from "react";
import { LuWind } from "react-icons/lu";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchWeatherData }  from '../utils/utils';

function AirPollution({ lat, lon }) {
    const [pollutionData, setPollutionData] = useState(null);
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    
    const defaultData = {
        list: [{
            components: {
                pm2_5: 46.7,
                so2: 18.6,
                no2: 17.3,
                o3: 115.9
            }
        }]
    };

    useEffect(() => {
        const fetchPollutionData = async () => {
           
            try {
                const apiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;    
                const data = await fetchWeatherData(apiUrl);
                setPollutionData(data); 
                toast.success("Air pollution data loaded successfully.");
            } catch (error) {
                console.error("Error fetching air pollution data:", error.message);
                setPollutionData(defaultData); 
                toast.error(error.message || "Failed to fetch air pollution data. Showing default values.");
            }
        };

        fetchPollutionData();
    }, [lat, lon]);

    const dataToShow = pollutionData || defaultData;

    return (
        <>
            <div className="rounded-lg bg-[#12111174] p-5">
                <span className="w-fit text-[#767676]">Air Quality Index</span>
                <div className="h-auto w-full flex flex-row mt-7">
                    <LuWind size={50} className="ml-4" />
                    <div className="bg-gree-400 w-full h-auto ml-5 flex flex-row justify-evenly">
                        <div className="h-full w-fit flex flex-col items-center">
                            <span className="text-xs text-[#767676]">PM25</span>
                            <span className="text-base md:text-xl mt-1">{dataToShow.list[0].components.pm2_5.toFixed(1)}</span>
                        </div>
                        <div className="h-full w-fit flex flex-col items-center">
                            <span className="text-xs text-[#767676]">SO2</span>
                            <span className="text-base md:text-xl mt-1">{dataToShow.list[0].components.so2.toFixed(1)}</span>
                        </div>
                        <div className="h-full w-fit flex flex-col items-center">
                            <span className="text-xs text-[#767676]">NO2</span>
                            <span className="text-base md:text-xl mt-1">{dataToShow.list[0].components.no2.toFixed(1)}</span>
                        </div>
                        <div className="h-full w-fit flex flex-col items-center">
                            <span className="text-xs text-[#767676]">O3</span>
                            <span className="text-base md:text-xl mt-1">{dataToShow.list[0].components.o3.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AirPollution;

