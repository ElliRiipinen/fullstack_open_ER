import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const WeatherInfo = ({ city }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService.getWeather(city).then(setWeather)
  }, [city])

  if (!weather) return <p>Loading weather...</p>

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>Temperature: {weather.main.temp} °C</p>
      <img src={iconUrl} alt={weather.weather[0].description} />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default WeatherInfo
