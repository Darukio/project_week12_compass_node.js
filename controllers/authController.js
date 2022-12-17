require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

const signToken = (id) =>
	jwt.sign({ id: id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	})

exports.signup = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		birthDate: new Date(req.body.birthDate),
		city: req.body.city,
		country: req.body.country,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
	})

	const token = signToken(newUser._id)
	// I can verify the signature in the web: https://jwt.io/

	res.status(201).set('Authorization', `Bearer ${token}`).json({
		status: 'success',
		data: {
			user: newUser,
		},
	})
})

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body

	// 1) Check if email and password exist
	if (!email || !password) {
		return next(new AppError('Provide email and password', 400))
	}

	// 2) Check if user exists && password is correct
	const user = await User.findOne({ email }).select('+password')

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError('Incorrect email or password'), 401)
	}

	// 3) Send token to client
	const token = signToken(user._id)

	res.status(200).json({
		status: 'success',
		token,
	})
})
