const Event = require('../models/eventModel')
const catchAsync = require('../utils/catchAsync')

exports.createEvent = catchAsync(async (req, res) => {
    const event = new Event({
        description: req.body.description,
        dateTime: new Date(req.body.dateTime),
    })

    const newEvent = await event.save()
    res.status(201).json({
        status: 'success',
        data: newEvent,
    })
})

exports.getAllEvents = catchAsync(async (req, res, next) => {
    const events = await Event.find()
    res.status(200).json({
        status: 'success',
        results: events.length,
        data: {
            events,
        },
    })
})

exports.getEventsByWeekday = catchAsync(async (req, res, next) => {
    const { weekdayParameter } = req.query

    if (weekdayParameter) {
        const dayOfWeek = [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
        ]

        const weekdayParam = dayOfWeek.indexOf(
            req.params.weekday.toLowerCase().trim()
        )

        if (weekdayParameter !== -1) {
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
                                weekdayParam + 1,
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
        } else {
            res.status(404).json({
                status: 'failure',
                description: `The weekday ${req.params.weekday} doesn't exists`,
            })
        }
    }
})

exports.getOneEvent = catchAsync(async (req, res, next) => {
    const { weekdayParameter } = req.query
    if (!weekdayParameter || weekdayParameter === 'false') {
        const event = await Event.findById(req.params.id)
        res.status(200).json({
            stauts: 'sucess',
            data: event,
        })
    } else {
        next()
    }
})

exports.updateEvent = catchAsync(async (req, res, next) => {
    const { weekdayParameter } = req.query
    if (!weekdayParameter || weekdayParameter === 'false') {
        const { id } = req.params
        const updatedData = req.body
        const options = { new: true }

        const result = await Event.findByIdAndUpdate(id, updatedData, options)

        res.status(200).send(result)
    }
})

exports.deleteEvent = catchAsync(async (req, res, next) => {
    const { weekdayParameter } = req.query
    if (!weekdayParameter || weekdayParameter === 'false') {
        const { id } = req.params
        const event = await Event.findByIdAndDelete(id)
        res.status(200).send(
            `Event ${event._id} with description ${event.description} has been deleted...`
        )
    } else {
        next()
    }
})

exports.deleteEventsByWeekday = catchAsync(async (req, res, next) => {
    const { weekdayParameter } = req.query

    if (weekdayParameter) {
        const dayOfWeek = [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
        ]

        const weekdayParam = dayOfWeek.findIndex(
            req.params.weekday.toLowerCase().trim()
        )

        if (weekdayParam !== -1) {
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
                                weekdayParam + 1,
                            ],
                        },
                    },
                },
            ])

            events.forEach(async (event) => {
                await Event.findByIdAndDelete(event._id)
            })

            res.status(200).json({
                status: 'success',
                results: events.length,
                data: {
                    events,
                },
            })
        }
    }
})
