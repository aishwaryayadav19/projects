import { Router } from 'express'

import user from './user'
import students from './students'

const router = Router()

router.use(user)
router.use(students)

export default router
