/* eslint-disable node/no-unpublished-require */
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongod = null

/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => {
	mongod = MongoMemoryServer.create()

	const uri = (await mongod).getUri()

	await mongoose.connect(uri)
}

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
	await mongoose.connection.dropDatabase()

	await mongoose.disconnect()
	;(await mongod).stop()
}

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
	const { collections } = mongoose.connection

	// eslint-disable-next-line no-restricted-syntax, guard-for-in
	for (const key in collections) {
		const collection = collections[key]
		collection.deleteMany()
	}
}
