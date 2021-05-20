import { Request, Response, NextFunction } from 'express'

/*
----------- 😈 -------------
    Handle async errors
-------------- -------------
*/
export const AsyncWrapper = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await fn(req, res, next).catch((err: Error) => next(err))
  }
}
