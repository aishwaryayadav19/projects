import { Request, Response } from 'express'
import { AsyncWrapper } from '../libs/async-wrapper'
import { serviceHealthStatus } from '../models/common'

const getHealthStatus = AsyncWrapper(async (req: Request, res: Response) => {
  await serviceHealthStatus()
  return res.send({ status: true })
})

export { getHealthStatus }
