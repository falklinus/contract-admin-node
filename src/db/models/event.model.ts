import { Schema, model } from 'mongoose'

import { Event } from '../../interfaces'

const schema = new Schema<Event>({
	name: {
		type: String,
		enum: ['ContractCreatedEvent', 'ContractTerminatedEvent'],
		required: true,
	},
	contractId: { type: String, required: true },
	premium: Number,
	startDate: String,
	terminationDate: String,
})

export const EventModel = model<Event>('Event', schema)
