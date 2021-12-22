import { createContext, useContext, useEffect, useState } from "react";
import { useSearchCity } from "../context/SearchCityContext";
import apiKey from "../apikey";

import axios from "axios"

const WeatherApiContext = createContext();

export const WeatherApiProvider = ({children}) => {

  const city = useSearchCity()
 
  const [data, setData] = useState([])

  const [geo, setGeo] = useState({ 
    lat: 39.9199,
    lon: 32.8543
  })
  
  const [loading, setLoading] = useState(true)

  const [dailyData, setDailyData] = useState({})

  

  useEffect(() => {
    
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
      axios.get(url)
        .then(res => res.data)
        .then(data => {
          const url1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely,alerts&units=metric&appid=${apiKey}`;
      
      axios.get(url1)
         .then(res => res.data)
         .then(data => {
           setData(data);
           setLoading(false);
         });
      });
  }, [city]);

  
  
  const values = {
    data: data,
    loading: loading,
  }

  //!loading && console.log(dailyData)
  
  return (<WeatherApiContext.Provider value={values}>
    
    
    {children}
    </WeatherApiContext.Provider>)
}

export const useWeatherApi = () => useContext(WeatherApiContext);