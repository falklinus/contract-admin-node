import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'
import { UserModel } from '../db'
import { User, CustomRequest } from '../interfaces'

const jwtSignUser = (user: User) => {
	const ONE_DAY = 60 * 60 * 24
	return jwt.sign(user, config.jwtSecret, {
		expiresIn: ONE_DAY,
	})
}

export const login = async (req: Request, res: Response): Promise<any> => {
	const { username, password }: User = req.body
	try {
		console.log(req.body)
		const user = await UserModel.findOne({ username })
		if (!user)
			return res
				.status(401)
				.send({ error: 'The login information was incorrect' })

		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid)
			return res
				.status(401)
				.send({ error: 'The login information was incorrect' })

		res.json({ user, token: jwtSignUser(user.toJSON()) })
	} catch (err) {
		console.log('Error', err)
		res.status(500).send({
			user: null,
		})
	}
}

export const getAuthUser = async (
	req: CustomRequest,
	res: Response
): Promise<any> => {
	try {
		res.send(req.user)
	} catch (err) {
		console.log('Error', err)
		res.status(500).send({
			user: null,
		})
	}
}
