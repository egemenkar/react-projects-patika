import { useSearchCity } from "../context/SearchCityContext";
import { useWeatherApi } from "../context/WeatherApiContext"


export default function Container() {

  const {data, loading} = useWeatherApi();
  

  if (loading) {
    return <h1>Loading...</h1>
  } else {
    return (
      <div>
      <h1>{!loading && data.name}</h1>
      <h2>Lat: {!loading && data.coord.lat}</h2>
      <h2>Lon: {!loading && data.coord.lon}</h2>
    </div>
    )
  }
}
