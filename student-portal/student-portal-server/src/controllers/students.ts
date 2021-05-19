import { Request, Response } from 'express'
import { AsyncWrapper } from '../libs/async-wrapper'
import {
  getClasses,
  getListOfStudents,
  addNewStudent,
  editStudentDetails,
  getStudentInfo,
  addDocument,
  addStudentDocumentMapping
} from '../models/students'

const getClassList = AsyncWrapper(async (req: Request, res: Response) => {
  const results = await getClasses()
  const classList = results
    .map((classObject: any) => {
      return classObject.year
    })
    .sort()

  return res.send({ status: true, data: classList })
})

const getStudentsList = AsyncWrapper(async (req: Request, res: Response) => {
  const {
    query: { schoolClass }
  } = req
  const results = await getListOfStudents(Number(schoolClass))
  return res.send({ status: true, data: results })
})

const addStudent = AsyncWrapper(async (req: Request, res: Response) => {
  const { body } = req
  const results = await addNewStudent(body)
  return res.send({ status: true, data: { id: results.insertId } })
})

const editStudent = AsyncWrapper(async (req: Request, res: Response) => {
  const { body } = req
  const results = await editStudentDetails(body)
  return res.send({ status: true, data: [] })
})

const getStudentsDetails = AsyncWrapper(async (req: Request, res: Response) => {
  const {
    query: { email }
  } = req
  const results = await getStudentInfo(String(email))
  return res.send({ status: true, data: results ? results[0] : {} })
})

const uploadDocument = AsyncWrapper(async (req: Request, res: Response) => {
  const {
    body: { file, number, studentId }
  } = req
  const { insertId } = await addDocument({ file, number })
  const results = await addStudentDocumentMapping({ documentId: insertId, studentId })
  return res.send({ status: true, data: { id: results.insertId } })
})

export { getClassList, getStudentsList, addStudent, editStudent, getStudentsDetails, uploadDocument }
