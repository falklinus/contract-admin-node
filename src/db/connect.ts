import mongoose from 'mongoose'
import config from '../config'

export const connect = async () => {
	try {
		await mongoose.connect(config.mongoUri)
		console.log('Database connected')
	} catch (err) {
		console.log(err)
	}
}
