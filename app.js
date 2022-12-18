const express = require('express')
const compression = require('compression')
// eslint-disable-next-line node/no-extraneous-require
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const xssClean = require('xss-clean')
const eventRoutes = require('./routes/eventRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(helmet())

const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests from this IP, please try again in an hour',
})
app.use(limiter)

app.use(express.json({ limit: '10kb' }))

app.use(mongoSanitize())
app.use(xssClean())

app.use(compression())

app.use('/api/v1/events', eventRoutes)
app.use('/api/v1/users', userRoutes)

module.exports = app
