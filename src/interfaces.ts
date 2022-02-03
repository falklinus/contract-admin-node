import { Response, Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface User {
	username: string
	password: string
}

export interface Contract {
	contractId: string
	premium: number
	startDate: string
	terminationDate?: string
}

export interface Event {
	name: string
	contractId: string
	premium?: number
	startDate?: string
	terminationDate?: string
}

export interface CustomResponse extends Response {
	paginatedResults?: any
}

export interface CustomRequest extends Request {
	user?: User | string | JwtPayload | undefined
}

export interface PaginationResult {
	data: any[]
	paging: {
		total: number
		current: number
	}
}

export interface ErrorMsg {
	name?: string
	contractId?: string
	premium?: string
	date?: string
}
