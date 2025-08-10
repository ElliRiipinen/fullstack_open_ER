const express = require('express')
const app = express()
const path = require('path')
app.use(express.json())
const Person = require('./models/persons')


const morgan = require('morgan')
morgan.token('body', (request) => {
  return request.method === 'POST' ? JSON.stringify(request.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static(path.join(__dirname, 'build')))

/*let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]*/

app.get('/info', async (request, response) => {
  try {
    const count = await Person.countDocuments({})
    const date = new Date()
    response.send(`<p>Phonebook has info for ${count} people </p> <p>${date}</p>`)
  } catch (error) {
    response.status(500).send('Failed to fetch info')
  }
})

/*Muokattu hakemaan persons.js tiedostosta tiedot */
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', async (request, response) => {
  try {
    const person = await Person.findById(request.params.id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch person' })
  }
})

app.delete('/api/persons/:id', async (request, response) => {
  try {
    await Person.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
    catch (erros) {
      response.status(500).json({error: 'Failed to delete person'})
    }
})

app.post('/api/persons', async (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number is missing' })
  }

  /*const nameExists = persons.find(person => person.name === body.name)
  if (nameExists) {
    return response.status(400).json({ error: 'name must be unique' })
  } VANHA VERSIO*/

  const nameExists = await Person.find({name: body.name})
  if (nameExists.length > 0) {
    return response.status(400).json({ error: 'name must be unique' })
  }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
})

app.put('/api/persons/:id', async (request, response) => {
  const { number } = request.body

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      request.params.id,
      { number },
      { new: true, runValidators: true, context: 'query' }
    )
    response.json(updatedPerson)
  } catch (error) {
    response.status(500).json({ error: 'Failed to update person' })
  }
})

app.use(express.static('build'))



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
