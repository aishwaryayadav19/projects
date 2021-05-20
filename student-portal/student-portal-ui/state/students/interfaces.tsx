export interface IStudentDetails {
  id: number
  fullName: string
  gender: string
  schoolClass: string
  dateOfBirth: string
  street: string
  city: string
  state: string
  country: string
  postalCode: string
  email: string
  contactNumber: string
}

export interface IStudentState {
  details: IStudentDetails
  documentDetails: {
    file: string
    number: string
  }
}
