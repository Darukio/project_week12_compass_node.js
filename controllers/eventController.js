const Event = require('../models/eventModel')
const catchAsync = require('../utils/catchAsync')

exports.createEvent = catchAsync(async (req, res) => {
	const event = new Event({
		description: req.body.description,
		dateTime: new Date(req.body.dateTime),
	})

	const eventToSave = await event.save()
	res.status(201).json({
		status: 'success',
		data: eventToSave,
	})
})

exports.getAllEvents = catchAsync(async (req, res) => {
	const events = await Event.find()
	res.status(200).json({
		status: 'success',
		results: events.length,
		data: {
			events,
		},
	})
})

exports.getEventsByWeekday = catchAsync(async (req, res) => {
	const weekdayParam = parseInt(req.params.weekday, 10)

	const events = await Event.aggregate([
		{
			$match: {
				$expr: {
					$eq: [
						{
							$dayOfWeek: '$dateTime',
							// Note: I could use isoDayOfWeek, which brings the day of the week in a range from 0 to 6
							// dayOfWeek brings the day of the week in a range from 1 to 7
						},
						weekdayParam,
					],
				},
			},
		},
	])

	/*
	Alternative:
	const events = await Event.aggregate(
		[{
			$addFields: {
				dayOfWeek: {
					$dayOfWeek: "$dateTime"
				}
			}
		}, { $match: { dayOfWeek: weekdayParam } }]
	)
	*/

	res.status(200).json({
		status: 'success',
		results: events.length,
		data: {
			events,
		},
	})
})

exports.getOneEvent = catchAsync(async (req, res) => {
	const event = await Event.findById(req.params.id)
	res.status(200).json({
		stauts: 'sucess',
		data: event,
	})
})

exports.updateEvent = catchAsync(async (req, res) => {
	const { id } = req.params
	const updatedData = req.body
	const options = { new: true }

	const result = await Event.findByIdAndUpdate(id, updatedData, options)

	res.send(result)
})

exports.deleteEvent = catchAsync(async (req, res) => {
	const { id } = req.params
	const event = await Event.findByIdAndDelete(id)
	res.send(
		`Event ${event._id} with description ${event.description} has been deleted...`
	)
})
