import { IStudentDetails } from '../students/interfaces'

export interface IStudentState {
  studentsList: Array<IStudentDetails>
  classesList: Array<number>
}
