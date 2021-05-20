import { execQuery } from '../libs/db-manager'

const getUserDetails = async (email: string) => {
  try {
    const { results } = await execQuery(`SELECT is_admin as isAdmin FROM studentportal.students WHERE email = ?;`, [
      email
    ])
    return results
  } catch (e) {
    e.logMsg = 'Failed ping from server to db'
    throw e
  }
}

export { getUserDetails }
