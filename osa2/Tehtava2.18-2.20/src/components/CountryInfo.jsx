import { useEffect, useState } from 'react'
import WeatherInfo from './WeatherInfo'

const CountryInfo = ({ country }) => {
  const languages = Object.values(country.languages || {})
  const capital = country.capital ? country.capital[0] : 'N/A'

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {country.area}</p>

      <h3>Languages:</h3>
      <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>

      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />

      <WeatherInfo city={capital} />
    </div>
  )
}

export default CountryInfo
