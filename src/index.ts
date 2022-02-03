import express, { Application, Request, Response } from 'express'
import path from 'path'
import config from './config'
import cors from 'cors'
import { contractRouter, eventRouter, userRouter } from './routers'
import { connectToDb } from './db'
import { isAuthenticated } from './middlewares'

connectToDb()

const app: Application = express()
app.use(express.json())
app.use(cors())

app.use('/contract', isAuthenticated, contractRouter)
app.use('/event', isAuthenticated, eventRouter)
app.use('/user', userRouter)

app.get('*', (req: Request, res: Response) => {
	res.send('Admin server app')
})

const PORT: string = config.port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
