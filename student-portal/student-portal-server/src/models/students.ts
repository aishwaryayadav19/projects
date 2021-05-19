import { execQuery } from '../libs/db-manager'

const getClasses = async () => {
  try {
    const { results } = await execQuery(`SELECT DISTINCT year FROM studentportal.classes;`, [])
    return results
  } catch (e) {
    e.logMsg = 'Failed ping from server to db'
    throw e
  }
}

const getListOfStudents = async (schoolClass: number) => {
  try {
    const { results } = await execQuery(
      `SELECT s.id, full_name as fullName, gender, c.year as schoolClass, email, contact_number as contactNumber,
      street, city, state, country, postal_code as postalCode, date_of_birth as dateOfBirth 
      FROM studentportal.students s JOIN studentportal.classes c ON s.class = c.id 
      WHERE c.year = ? AND is_admin = 0;`,
      [schoolClass]
    )
    return results
  } catch (e) {
    e.logMsg = 'Failed ping from server to db'
    throw e
  }
}

const addNewStudent = async (params: any) => {
  try {
    const {
      fullName,
      gender,
      email,
      contactNumber,
      schoolClass,
      dateOfBirth,
      street,
      city,
      state,
      country,
      postalCode
    } = params
    const { results: res } = await execQuery('SELECT id FROM studentportal.classes WHERE year = ?;', [schoolClass])
    console.log(res)
    const { results } = await execQuery(
      `INSERT INTO studentportal.students
      (full_name, gender, class, date_of_birth, email, contact_number, street, city, state, country, postal_code) 
      VALUE (?,?,?,?,?,?,?,?,?,?,?);`,
      [
        fullName || null,
        gender || null,
        res[0].id || null,
        dateOfBirth || null,
        email || null,
        contactNumber || null,
        street || null,
        city || null,
        state || null,
        country || null,
        postalCode || null
      ]
    )
    return results
  } catch (e) {
    e.logMsg = 'Failed ping from server to db'
    throw e
  }
}

const editStudentDetails = async (params: any) => {
  try {
    const { id, fullName, gender, email, contactNumber, dateOfBirth, street, city, state, country, postalCode } = params
    const { results } = await execQuery(
      `UPDATE studentportal.students
        SET full_name = ?, gender = ?, date_of_birth = ?, email = ?, contact_number = ?, street = ?, city = ?, state = ?, country = ?, postal_code = ?
        WHERE id = ?;`,
      [
        fullName || null,
        gender || null,
        dateOfBirth || null,
        email || null,
        contactNumber || null,
        street || null,
        city || null,
        state || null,
        country || null,
        postalCode || null,
        id
      ]
    )
    return results
  } catch (e) {
    e.logMsg = 'Failed ping from server to db'
    throw e
  }
}

const getStudentInfo = async (email: string) => {
  try {
    const { results } = await execQuery(
      `SELECT s.id, full_name as fullName, gender, c.year as schoolClass, email, contact_number as contactNumber, street, city, state, country, postal_code as postalCode, date_of_birth as dateOfBirth 
        FROM studentportal.students s JOIN studentportal.classes c ON s.class = c.id 
        WHERE email = ?;`,
      [email]
    )
    return results
  } catch (e) {
    e.logMsg = 'Failed ping from server to db'
    throw e
  }
}

const addDocument = async (documentDetails: any) => {
  try {
    const { file, number } = documentDetails
    const { results } = await execQuery(`INSERT INTO studentportal.documents(doc, doc_number) value(?,?);`, [
      file,
      number
    ])
    return results
  } catch (e) {
    e.logMsg = 'Failed ping from server to db'
    throw e
  }
}

const addStudentDocumentMapping = async (mappingDetails: any) => {
  try {
    const { studentId, documentId } = mappingDetails
    console.log({ studentId, documentId })
    const { results } = await execQuery(
      `INSERT INTO studentportal.student_document_mapping(student_id, document_id) value(?,?);`,
      [studentId, documentId]
    )
    return results
  } catch (e) {
    e.logMsg = 'Failed ping from server to db'
    throw e
  }
}

export {
  getClasses,
  getListOfStudents,
  addNewStudent,
  editStudentDetails,
  getStudentInfo,
  addDocument,
  addStudentDocumentMapping
}
