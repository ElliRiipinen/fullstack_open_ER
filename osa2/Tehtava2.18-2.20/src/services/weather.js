import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  return axios.get(url).then(res => res.data)
}

export default { getWeather }
