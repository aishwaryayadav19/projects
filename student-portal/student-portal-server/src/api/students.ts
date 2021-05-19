import { Router } from 'express'
import {
  getClassList,
  getStudentsList,
  addStudent,
  editStudent,
  getStudentsDetails,
  uploadDocument
} from '../controllers/students'

const router = Router()

router.get('/students/classList', getClassList)
router.get('/students/list', getStudentsList)
router.get('/students/info', getStudentsDetails)
router.post('/students/add', addStudent)
router.post('/students/document', uploadDocument)
router.put('/students/edit', editStudent)

export default router
