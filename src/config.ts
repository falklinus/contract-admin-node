import { config } from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
	config()
}

export default {
	port: process.env.PORT || '8081',
	mongoUri: process.env.MONGO_URI || 'mongoUri',
	jwtSecret: process.env.JWT_SECRET || 'jwtSecret',
}
