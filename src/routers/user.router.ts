import { Router } from 'express'
import { login, getAuthUser } from '../controllers/user.controller'
import { isAuthenticated } from '../middlewares'

const router = Router()

router.get('/', isAuthenticated, getAuthUser)
router.post('/login', login)

export { router }
