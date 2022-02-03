import { Schema, model } from 'mongoose'

import { Contract } from '../../interfaces'

const schema = new Schema<Contract>({
	contractId: { type: String, required: true, unique: true },
	premium: { type: Number, required: true },
	startDate: { type: String, required: true },
	terminationDate: String,
})

export const ContractModel = model<Contract>('Contract', schema)
