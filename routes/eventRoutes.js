const express = require('express')
const eventController = require('../controllers/eventController')
const authController = require('../controllers/authController')

const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Event:
 *          type: object
 *          properties:
 *              description:
 *                  type: string
 *              dateTime:
 *                  type: string
 *          required:
 *              - description
 *              - dateTime
 *          example:
 *              description: Tute's birthday
 *              dateTime: 2022-04-03
 *  responses:
 *      UnauthorizedError:
 *          description: Access token is missing or invalid
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1/events/:
 *  get:
 *      summary: get all events
 *      tags: [Events]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: All events
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *  post:
 *      summary: create one event
 *      tags: [Events]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Event'
 *      responses:
 *          201:
 *              description: New event created
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 */
router
    .route('/')
    .get(authController.protect, eventController.getAllEvents)
    .post(authController.protect, eventController.createEvent)

/**
 * @swagger
 * /api/v1/events/{id}:
 *  get:
 *      summary: get events by weekday or one event by id
 *      tags: [Events]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: id of the event (or the weekday, like monday)
 *          schema:
 *              type: string
 *          required: true
 *          style: simple
 *        - name: weekdayParameter
 *          in: query
 *          description: is a weekday query? (true or false)
 *          required: true
 *          schema:
 *              type: boolean
 *              default: false
 *          style: simple
 *      responses:
 *          200:
 *              description: Events by weekday if weekdayParameter is set to true or one event if it is set to false
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *  patch:
 *      summary: update one event
 *      tags: [Events]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: id of the event
 *          schema:
 *              type: string
 *          style: simple
 *          required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Event'
 *      responses:
 *          201:
 *              description: Event updated
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *  delete:
 *      summary: delete events by weekday or one event
 *      tags: [Events]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: id of the event
 *          schema:
 *              type: string
 *          style: simple
 *          required: true
 *        - name: weekdayParameter
 *          in: query
 *          description: is a weekday query? (true or false)
 *          required: true
 *          schema:
 *              type: bool
 *              default: false
 *          style: simple
 *      responses:
 *          201:
 *              description: Events deleted by weekday or one event deleted
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 */
router
    .route('/:id')
    .get(authController.protect, eventController.getOneEvent)
    .patch(authController.protect, eventController.updateEvent)
    .delete(authController.protect, eventController.deleteEvent)

router
    .route('/:weekday')
    .get(authController.protect, eventController.getEventsByWeekday)
    .delete(authController.protect, eventController.deleteEventsByWeekday)

module.exports = router
