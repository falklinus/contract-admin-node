import { Request, Response, NextFunction } from 'express'
import { EventModel, ContractModel } from '../db'
import { ErrorMsg } from '../interfaces'

export const eventValidation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let errorMsg: ErrorMsg = {}
	const { contractId, name, premium, startDate, terminationDate } = req.body
	let matchingContract, duplicateEvent
	// contractId
	if (!contractId) errorMsg.contractId = 'Required'
	else {
		if (name === 'ContractCreatedEvent') {
			duplicateEvent = await EventModel.findOne({ contractId, name })
			if (duplicateEvent) {
				errorMsg.contractId = 'Contract already exists'
			}
		}
		if (name === 'ContractTerminatedEvent') {
			matchingContract = await ContractModel.findOne({ contractId })
			if (!matchingContract) errorMsg.contractId = 'Contract does not exist'
			duplicateEvent = await EventModel.findOne({ contractId, name })
			if (duplicateEvent) {
				errorMsg.contractId = 'Contract already terminated'
			}
		}
	}

	// name
	if (['ContractCreatedEvent', 'ContractTerminatedEvent'].indexOf(name) === -1)
		errorMsg.name = 'Not a valid event name'

	// ContractCreatedEvent
	if (name === 'ContractCreatedEvent') {
		req.body = { contractId, name, premium, startDate }

		// premium
		if (premium === 0) {
		} else if (!premium) errorMsg.premium = 'Required'
		else if (premium < 0) errorMsg.premium = 'Not valid'

		// startDate
		if (!startDate) errorMsg.date = 'Required'
		else if (!isValidDate(startDate)) errorMsg.date = 'Not valid'
	}

	// ContractTerminatedEvent
	if (name === 'ContractTerminatedEvent') {
		req.body = { contractId, name, terminationDate }

		// terminationDate
		if (!terminationDate) errorMsg.date = 'Required'
		else if (!isValidDate(terminationDate)) errorMsg.date = 'Not valid'
		else if (matchingContract && matchingContract.startDate > terminationDate)
			errorMsg.date = 'Not valid'
	}

	if (!(Object.keys(errorMsg).length === 0)) {
		console.log({ error: errorMsg })
		return res.status(400).send({ error: errorMsg })
	} else next()
}

const isValidDate = (dateString: string): boolean => {
	const regEx = /^\d{4}-\d{2}-\d{2}$/
	if (!String(dateString).match(regEx)) return false // Invalid format
	const d = new Date(dateString)
	const dNum = d.getTime()
	if (!dNum && dNum !== 0) return false // NaN value, Invalid date
	return d.toISOString().slice(0, 10) === dateString
}
