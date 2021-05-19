'use strict'

// 🙏 Welcome

import express, { Application, Request, Response, NextFunction } from 'express'
import http from 'http'
import compression from 'compression'
import bodyParser from 'body-parser'
import config from './config'

const {
  host,
  port,
  bodyParser: { jsonLimit }
} = config

import apis from './api'
import corsRouter from './libs/cors'
import { getHealthStatus } from './controllers/common'

export const app: Application = express()

const server = http.createServer(app)

app.use(compression())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: jsonLimit }))

// TODO: ⚠️ Resolve conditional export warning
app.use((req: Request, res: Response, next: NextFunction) => {
  res.set('Pragma', 'no-cache')
  res.set('Cache-Control', ['no-cache', 'no-store', 'must-revalidate'])
  next()
})

// TODO: CORS handler middleware
app.use('/', corsRouter)

app.get('/api/healthcheck', getHealthStatus)

// Actual Routes
app.use('/api', apis)

interface ICustomError extends Error {
  statusCode?: 400 | 401 | 409 | 412 | 422 | 424 | 500 // These are the only err codes defined in our Err metadata
}

// TODO: Fix CLS bug: rare case - same NS between reqs, might be related to new release of the package
app.use((error: ICustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500
  console.log('ERROR -------', error)
  return res.status(statusCode).send({
    status: false,
    data: 'Error occurred.'
  })
})

process.on('unhandledRejection', (reason: any, promise: any) => {
  console.log('Global unhandledRejection Handler', reason.stack)
})

process.on('uncaughtException', (error) => {
  console.log('Global uncaughtException Handler', error)
  process.exit(1)
})

server.listen(port, host, () => {
  // Function to load up the error manager
  console.log('Student Service is ready to rock and roll .. 🚀 ..', { host, port })
})
