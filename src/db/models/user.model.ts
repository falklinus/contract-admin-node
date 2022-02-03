import { Schema, model } from 'mongoose'

import { User } from '../../interfaces'

const schema = new Schema<User>({
	username: { type: String, required: true },
	password: { type: String, required: true },
})

export const UserModel = model<User>('User', schema)
