const mongoose = require('mongoose')

/*Yhdistäminen MongoDP omaa salasanaa käyttäen */
const encodedPassword = encodeURIComponent("")
const url = `mongodb+srv://fullstackER:${encodedPassword}@clusterfullstack.hvdbuqe.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFullstack`

mongoose.set('strictQuery', false)
mongoose.connect(url)
/*POISTA SALASANA LOPUKSI */

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

module.exports = mongoose.model('Person', personSchema)