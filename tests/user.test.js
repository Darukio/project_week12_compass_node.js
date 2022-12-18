/* eslint-disable node/no-unpublished-require */
/* eslint-disable jest/expect-expect */
const request = require('supertest')
require('mongoose')
const db = require('./db')
const User = require('../models/userModel')
const app = require('../app')

beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

describe('POST /users', () => {
	describe('/signup', () => {
		const newUser = {
			firstName: 'Paulo Sebastian',
			lastName: 'Spaciuk',
			birthDate: '2002-05-15',
			city: 'Posadas',
			country: 'Argentina',
			email: 'Damian-200@live.com.ar',
			password: '12345678',
			passwordConfirm: '12345678',
		}

		test('should respond with a json and 200 status code', async () => {
			// I can use it instead of test
			await request(app)
				.post('/api/v1/users/signup')
				.send(newUser)
				.expect('Content-Type', /json/)
				.expect(201)
		})

		test('should persist the user successfully', async () => {
			await request(app).post('/api/v1/users/signup').send(newUser)

			const { email } = newUser
			const userPersisted = await User.findOne({ email }).select(
				'+password'
			)
			expect(userPersisted.firstName).toBe(newUser.firstName)
			expect(userPersisted.lastName).toBe(newUser.lastName)
			expect(userPersisted.birthDate).toStrictEqual(new Date(newUser.birthDate))
			expect(userPersisted.city).toBe(newUser.city)
			expect(
				await userPersisted.correctPassword(
					newUser.password,
					userPersisted.password
				)
			).toBe(true)
		})
	})

	describe('/login', () => {
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

		const requestUser = {
			email: 'Damian-200@live.com.ar',
			password: '12345678',
		}

		test('should respond with a json and 200 status code', async () => {
			await request(app)
				.post('/api/v1/users/login')
				.send(requestUser)
				.expect('Content-Type', /json/)
				.expect(200)
		})
	})
})
