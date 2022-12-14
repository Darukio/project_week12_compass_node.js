// DATABASE
require('dotenv').config()
const mongoose = require('mongoose')

const mongoString = process.env.DATABASE_URL.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)
mongoose.connect(mongoString)
const database = mongoose.connection

const app = require('./app')

const port = process.env.PORT || 3000

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected')
})

// APP
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})
