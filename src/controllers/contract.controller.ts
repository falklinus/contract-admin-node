import { Request, Response } from 'express'
import { ContractModel as Contracts } from '../db'

import { CustomResponse } from '../interfaces'

export const fetchContracts = async (
	req: Request,
	res: CustomResponse
): Promise<any> => {
	const id: string = req.query.id as string
	if (id) {
		try {
			const collection = await Contracts.find({
				contractId: { $regex: `${id}`, $options: 'i' },
				terminationDate: null,
			})
			return res.json({ data: collection })
		} catch (err) {
			console.log('Error', err)
			res.status(500).send({
				data: null,
			})
		}
	}
	return res.json(res.paginatedResults)
}
