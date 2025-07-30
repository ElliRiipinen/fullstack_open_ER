import Notification from './components/Notification'
import {useState, useEffect} from 'react'
import personService  from './services/persons'  
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFiletr] = useState('')

  useEffect(() => {
  personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
}, [])


  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const numberChange = (event) => {
    setNewNumber(event.target.value)
  }

   const filterChange = (event) => {
    setFiletr(event.target.value)
  }

  const [notification, setNotification] = useState(null)

const showNotification = (text, type = 'success') => {
  setNotification({ text, type })
  setTimeout(() => {
    setNotification(null)
  }, 4000)
}

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      const confirmUpdate = window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`)

      if(confirmUpdate) {

        const updatedPerson = {...existingPerson, number: newNumber}

        personsService.update(existingPerson.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(person =>
          person.id !== existingPerson.id ? person : returnedPerson ))
        setNewName('')
        setNewNumber('')
        showNotification(`Updated number of ${returnedPerson.name}`)
        })

   .catch(error => {
          alert(`Information of ${newName} has already been removed from server`, 'error')
          setPersons(persons.filter(p => p.id !== existingPerson.id))
        })
    }

    return
  }

      const newPerson = {
        name: newName,
        number: newNumber
      }
      
      personService.create(newPerson).then(returnedPerson =>{
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${returnedPerson.name}`)
      })
    
  }

  const removePerson = (id, name ) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(person=>   person.id !== id))
        showNotification(`Deleted ${name}`)
      })
      .catch(error => {
  showNotification(`Failed to delete ${name}. It may have already been removed.`, 'error')
  setPersons(persons.filter(p => p.id !== id))
})
    }
    
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter value={filter} onChange={filterChange} />
      <h2>Add a new</h2>
      <Form 
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        nameChange={nameChange}
        numberChange={numberChange}
         />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={removePerson}/>
    </div>
  )

}

export default App