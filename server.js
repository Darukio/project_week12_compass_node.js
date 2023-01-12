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

const { swaggerDocs } = require('./swagger')

database.on('error', (error) => {
    // eslint-disable-next-line no-console
    console.log(error)
})

database.once('connected', () => {
    // eslint-disable-next-line no-console
    console.log('Database Connected')
})

// APP
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server Started at ${port}`)
    swaggerDocs(app, port)
})
