import { createContext, useContext, useEffect, useState } from "react";
import { useSearchCity } from "../context/SearchCityContext";
import apiKey from "../apikey";

import axios from "axios"

const WeatherApiContext = createContext();

export const WeatherApiProvider = ({children}) => {

  const city = useSearchCity();
 
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    fetchData();
  }, [city])

  

  const fetchData = async () =>{

    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      setData(res.data)
      setLoading(false)
    } catch (error) {
      console.error(error.message);
    }

  }
  
  const values = {
    data: data,
    loading: loading,
  }


  
  return (<WeatherApiContext.Provider value={values}>
    
    
    {children}
    </WeatherApiContext.Provider>)
}

export const useWeatherApi = () => useContext(WeatherApiContext);