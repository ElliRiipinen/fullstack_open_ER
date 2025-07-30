import CountryInfo from './CountryInfo'

const CountryList = ({ countries, onShow }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />
  }

  return (
    <div>
      {countries.map(c => (
        <div key={c.name.common}>
          {c.name.common}
          <button onClick={() => onShow(c.name.common)}>show</button>
        </div>
      ))}
    </div>
  )
}

export default CountryList
