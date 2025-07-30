import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import CountryList from './components/CountryList'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countriesService.getAll().then(setAllCountries)
  }, [])

  useEffect(() => {
    setFilteredCountries(
      allCountries.filter(c =>
        c.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    )
  }, [filter, allCountries])

  const handleShow = (name) => {
    setFilter(name)
  }

  return (
    <div>
      <label>Find countries: </label>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <CountryList countries={filteredCountries} onShow={handleShow} />
    </div>
  )
}

export default App
