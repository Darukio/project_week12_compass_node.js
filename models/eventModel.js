const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
	{
		description: {
			required: [true, 'An Event must have a description'],
			type: String,
		},
		dateTime: {
			required: [true, 'An Event must have a date'],
			type: Date,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Event', eventSchema)
