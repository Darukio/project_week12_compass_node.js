const express = require('express')
const compression = require('compression')

const eventRoutes = require('./routes/eventRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(express.json())

app.use(compression())

app.use('/api/v1/events', eventRoutes)
app.use('/api/v1/users', userRoutes)

module.exports = app
