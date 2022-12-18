/* eslint-disable node/no-unpublished-require */
/* eslint-disable jest/expect-expect */
const request = require('supertest')
const db = require('./db')
const Event = require('../models/eventModel')
const User = require('../models/userModel')
const app = require('../app')

beforeAll(async () => await db.connect())
beforeEach(async () => {
	await User.create({
		firstName: 'Paulo Sebastian',
		lastName: 'Spaciuk',
		birthDate: '2002-05-15',
		city: 'Posadas',
		country: 'Argentina',
		email: 'Damian-200@live.com.ar',
		password: '12345678',
		passwordConfirm: '12345678',
	})
})
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

const requestUser = {
	email: 'Damian-200@live.com.ar',
	password: '12345678',
}

describe('POST /events/', () => {
	test('should respond with a json and 201 status code', async () => {
		const response = await request(app)
			.post('/api/v1/users/login')
			.send(requestUser)

		await request(app)
			.post('/api/v1/events/')
			.set('Authorization', response.headers.authorization)
			.send({
				description: "Camila's Weeding",
				dateTime: '2022-12-14',
			})
			.expect('Content-Type', /json/)
			.expect(201)
	})
})

describe('GET /events/', () => {
	test('should respond with a json and 200 status code', async () => {
		const response = await request(app)
			.post('/api/v1/users/login')
			.send(requestUser)

		await request(app)
			.get('/api/v1/events/')
			.set('Authorization', response.headers.authorization)
			.expect('Content-Type', /json/)
			.expect(200)
	})
})
