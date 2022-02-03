import { Router } from 'express'
import { fetchContracts } from '../controllers'
import { paginate } from '../middlewares'
import { ContractModel } from '../db'

const router = Router()

router.get('/', paginate(ContractModel), fetchContracts)

export { router }
