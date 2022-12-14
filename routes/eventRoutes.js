const express = require('express')
const eventController = require('../controllers/eventController')

const router = express.Router()

router
	.route('/')
	.get(eventController.getAllEvents)
	.post(eventController.createEvent)

router
	.route('/event/:id')
	.get(eventController.getOneEvent)
	.patch(eventController.updateEvent)
	.delete(eventController.deleteEvent)

router.route('/:weekday').get(eventController.getEventsByWeekday)

module.exports = router
