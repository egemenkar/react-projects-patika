import { useSearchCity } from "../context/SearchCityContext";
import { useWeatherApi } from "../context/WeatherApiContext";
import sunrise from "../images/sunrise.png"
import sunset from "../images/sunset.png"

export default function Container() {

  const {data, loading} = useWeatherApi();
  const {city} = useSearchCity()

  let weekday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
  

  if (loading) {
    return <h1>Loading...</h1>
  } else {
    let currentDate = new Date();
    currentDate.setTime(data.current.dt * 1000);
    let formattedCurrentDate = weekday[currentDate.getDay()] + " " + ("0" + currentDate.getHours()).slice(-2) + ":" + ("0" + currentDate.getMinutes()).slice(-2);
  
    let currentWeatherDesc = data.current.weather[0].description;
    let wordsArr = currentWeatherDesc.split(" ");
    for(let i = 0; i < wordsArr.length; i++) {
      wordsArr[i] = wordsArr[i].charAt(0).toUpperCase() + wordsArr[i].slice(1);
    }
    let weatherDesc = wordsArr.join(" ");

    let sunriseDate = new Date();
    sunriseDate.setTime(data.current.sunrise * 1000);
    let sunriseTime = ("0" + sunriseDate.getHours()).slice(-2) + ":" + ("0" + sunriseDate.getMinutes()).slice(-2);

    let sunsetDate = new Date();
    sunsetDate.setTime(data.current.sunset * 1000);
    let sunsetTime = ("0" + sunsetDate.getHours()).slice(-2) + ":" + ("0" + sunsetDate.getMinutes()).slice(-2);
    
    return (
    <div className="container">
      <div className="current">
        <div className="current-weather">
          <img src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`} />
          <h2>{Math.round(Number(data.current.temp))}</h2>
          <h4>°C</h4>
          <div className="current-details">
            <p>Clouds: {data.current.clouds}%</p>
            <p>Humidity: {data.current.humidity}%</p>
            <p>Wind: {data.current.wind_speed} km/h</p>
          </div>
        </div>

        <div className="sun">
          <div className="sunrise">
            <img src={sunrise} />
            <p>{sunriseTime}</p>
          </div>
          <div className="sunset">
            <img src={sunset} />
            <p>{sunsetTime}</p>
          </div>
        </div>

        <div className="current-time">
          <h2>{city}</h2>
          <h3>{formattedCurrentDate}</h3>
          <h3>{weatherDesc}</h3>
        </div>
      </div>
      
      <div className="weather-container">
        {data.daily.map((day, idx) => {
        let pubDate = new Date();
        pubDate.setTime(day.dt * 1000);

        let dayOfTheWeek = weekday[pubDate.getDay()];

        return (
          <div key={idx} className={`day ${idx === 0 ? "today" : idx === 7 ? "lastday" : ""}`}>
            <h4>{idx === 0 ? "Today" : dayOfTheWeek}</h4>
            <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} />
            <h4>{Math.round(Number(day.temp.max))}° <span>{Math.round(Number(day.temp.min))}°</span></h4>
          </div>
          )
        }
      )}
      </div>
    </div>
    )
  }
}
