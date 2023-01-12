const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// https://swagger.io/specification/

// Metadata info about our API
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Project Week 12 Nodejs Compass Course',
            version: '1.0.0',
        },
    },
    apis: ['routes/*.js'],
}

// Docs in JSON format
const swaggerSpec = swaggerJsdoc(options)

// Function to setup our docs
const swaggerDocs = (app) => {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get('/api/v1/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}

module.exports = { swaggerDocs }
