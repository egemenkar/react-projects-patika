import { useSearchCity } from "../context/SearchCityContext";
import { useWeatherApi } from "../context/WeatherApiContext";
import { useState, useEffect, useContext } from "react";


export default function Container() {

  const {data, loading} = useWeatherApi();
  const city = useSearchCity()

  let weekday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
  

  if (loading) {
    return <h1>Loading...</h1>
  } else {
    let currentDate = new Date();
    currentDate.setTime(data.current.dt * 1000);
    let formattedCurrentDate = weekday[currentDate.getDay()] + " " + currentDate.getHours() + ":" + currentDate.getMinutes();
  

    return (
    <div className="container">
      <div className="current">
        <div className="current-weather">
        <img src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`} />
        <h2>{Math.round(Number(data.current.temp))}°C</h2>
        </div>
        <div className="current-time">
          <h2>{city}</h2>
          <h3>{formattedCurrentDate}</h3>
          <h3>{data.current.weather[0].description}</h3>
        </div>
      
      </div>
      
      <div className="weather-container">
        {data.daily.map((day, idx) => {
        console.log(day);
        let pubDate = new Date();
        pubDate.setTime(day.dt * 1000);

        let dayOfTheWeek = weekday[pubDate.getDay()];

        return (<div key={idx} className={`day ${idx === 0 ? "today" : ""}`}>
            <h4>{idx === 0 ? "Today" : dayOfTheWeek}</h4>
            <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} />
            <h4>{Math.round(Number(day.temp.min))}° {Math.round(Number(day.temp.max))}°</h4>
          </div>)

      })}
      </div>
    </div>
    )
  }
}
