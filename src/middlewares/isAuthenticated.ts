import { Request, Response, NextFunction } from 'express'
import { CustomRequest } from '../interfaces'
import jwt from 'jsonwebtoken'
import config from '../config'

export const isAuthenticated = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if (token == null) return res.status(401).send({ error: 'No auth token' })
	try {
		const user = jwt.verify(token, config.jwtSecret)
		req.user = user
		next()
	} catch (err) {
		console.log('Error', err)
		res.status(400).send({
			error: 'Not authenticated',
		})
	}
}
