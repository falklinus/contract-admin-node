import { Router } from 'express'
import { addNewEvent } from '../controllers'
import { eventValidation } from '../middlewares'

const router = Router()

router.post('/', eventValidation, addNewEvent)

export { router }
