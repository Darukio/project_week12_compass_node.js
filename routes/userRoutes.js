const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              firstName:
 *                  type: string
 *              lastName:
 *                  type: string
 *              birthDate:
 *                  type: string
 *              city:
 *                  type: string
 *              country:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *                  format: password
 *              passwordConfirm:
 *                  type: string
 *                  format: password
 *          required:
 *              - firstName
 *              - lastName
 *              - birthDate
 *              - city
 *              - country
 *              - email
 *              - password
 *              - passwordConfirm
 *          example:
 *              firstName: Julieta del Carmen
 *              lastName: Martinez
 *              birthDate: 2002-12-20
 *              city: Posadas
 *              country: Argentina
 *              email: julietamartinez@outlook.es
 *              password: messi102022
 *              passwordConfirm: messi102022
 *
 *      Login:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *                  format: password
 *          required:
 *              - email
 *              - password
 *          example:
 *              email: julietamartinez@outlook.es
 *              password: messi102022
 */

/**
 * @swagger
 * /api/v1/users/signup:
 *  post:
 *      summary: create a new user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: New user created
 */
router.post('/signup', authController.signup)

/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *      summary: login with a email and a password
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *              description: Logged user, the token is given through the authorization header
 */
router.post('/login', authController.login)

module.exports = router
