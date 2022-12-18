const express = require('express')
const eventController = require('../controllers/eventController')
const authController = require('../controllers/authController')

const router = express.Router()

router
	.route('/')
	.get(authController.protect, eventController.getAllEvents)
	.post(authController.protect, eventController.createEvent)

router
	.route('/:id')
	.get(authController.protect, eventController.getOneEvent)
	.patch(authController.protect, eventController.updateEvent)
	.delete(authController.protect, eventController.deleteEvent)

router
	.route('/:weekday')
	.get(eventController.getEventsByWeekday)
	.delete(authController.protect, eventController.deleteEventsByWeekday)

module.exports = router
