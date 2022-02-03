import { Request, Response } from 'express'
import { EventModel, ContractModel } from '../db'

export const addNewEvent = async (
	req: Request,
	res: Response
): Promise<any> => {
	const { contractId, name, premium, startDate, terminationDate } = req.body
	try {
		await new EventModel(req.body).save()
		if (name === 'ContractCreatedEvent') {
			const contract = await new ContractModel({
				contractId,
				premium,
				startDate,
			}).save()
			return res.json({ data: contract })
		}
		if (name === 'ContractTerminatedEvent') {
			await ContractModel.updateOne({ contractId }, { terminationDate })
			const contract = await ContractModel.findOne({ contractId })
			return res.json({ data: contract })
		}
		res.status(500).send()
	} catch (err) {
		console.log('Error', err)
		res.status(500).send({
			data: null,
		})
	}
}
