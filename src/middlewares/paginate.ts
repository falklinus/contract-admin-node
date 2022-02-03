import { Request, NextFunction } from 'express'
import { CustomResponse, PaginationResult } from '../interfaces'

export const paginate =
	(model: any) => (req: Request, res: CustomResponse, next: NextFunction) => {
		const id: string = req.query.id as string
		if (id) return next()
		return offsetPagination(model, req, res, next)
	}

const offsetPagination = async (
	model: any,
	req: Request,
	res: CustomResponse,
	next: NextFunction
): Promise<any> => {
	const limit: number = parseInt(req.query.limit as string) || 10
	const page: number = parseInt(req.query.page as string) || 1
	const sort: string = req.query.sort as string
	let pages: number, collectionCount: number, collection: any[]
	try {
		if (sort.includes('contractId')) {
			let allDocs: any[] = await model.find()
			allDocs = allDocs.sort((a: any, b: any) => {
				let left: any, right: any
				if (sort.includes('-')) {
					left = b
					right = a
				} else {
					left = a
					right = b
				}
				if (
					isNaN(parseInt(left.contractId)) &&
					isNaN(parseInt(right.contractId))
				)
					return 0
				if (isNaN(parseInt(right.contractId))) return -1
				if (isNaN(parseInt(left.contractId))) return 1
				return parseInt(left.contractId) - parseInt(right.contractId)
			})
			pages = Math.ceil(allDocs.length / limit)
			collection = allDocs.slice((page - 1) * limit, page * limit)
		} else {
			collection = await model
				.find()
				.sort(sort)
				.skip((page - 1) * limit)
				.limit(limit)

			collectionCount = await model.count()
			pages = Math.ceil(collectionCount / limit)
		}
		res.paginatedResults = {
			paging: {
				total: pages,
				current: page,
			},
			data: collection,
		} as PaginationResult

		next()
	} catch (err) {
		console.log('Error', err)
		res.status(500).send({
			data: null,
		})
	}
}
