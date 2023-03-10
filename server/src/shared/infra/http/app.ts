import express, { NextFunction, Request, Response } from 'express'
import { AppError } from '@errors/AppError'
import 'express-async-errors'
import cors from 'cors'
import { router } from './routes'

import '@shared/container'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      })
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    })
  },
)

export { app }
