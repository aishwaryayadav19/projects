import { Request, Response } from 'express'
import { AsyncWrapper } from '../libs/async-wrapper'
import { getUserDetails } from '../models/user'

const getDetails = AsyncWrapper(async (req: Request, res: Response) => {
  const {
    query: { email }
  } = req
  const results = await getUserDetails(String(email))
  return res.send({ status: true, data: results[0] })
})

export { getDetails }
