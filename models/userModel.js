const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
	{
		firstName: {
			required: [true, 'An User must have a first name'],
			type: String,
		},
		lastName: {
			required: [true, 'An User must have a last name'],
			type: String,
		},
		birthDate: {
			required: [true, 'An User must have a birthdate'],
			type: Date,
		},
		city: {
			required: [true, 'An User must have a city'],
			type: String,
		},
		country: {
			required: [true, 'An User must have a country'],
			type: String,
		},
		email: {
			required: [true, 'An User must have a email'],
			unique: true,
			lowercase: true,
			type: String,
			validate: [validator.isEmail],
		},
		password: {
			required: [true, 'An User must have a password'],
			type: String,
			minlength: 8,
			select: false,
		},
		passwordConfirm: {
			required: [true, 'You must to confirm the password'],
			type: String,
			validate: {
				validator: function (el) {
					return el === this.password
				},
				message: 'Passwords are not the same',
			},
		},
	},
	{ timestamps: true }
)

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next()

	this.password = await bcrypt.hash(this.password, 12)

	this.passwordConfirm = undefined
	next()
})

userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword)
}

module.exports = mongoose.model('User', userSchema)
