import { Router } from 'express'
import { getDetails } from '../controllers/user'

const router = Router()

router.get('/user/details', getDetails)

export default router
