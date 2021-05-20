import { execQuery } from '../libs/db-manager'

const serviceHealthStatus = async () => {
  try {
    const { results } = await execQuery(`select 1`, [])
    return results
  } catch (e) {
    e.logMsg = 'Failed ping from server to db'
    throw e
  }
}

export { serviceHealthStatus }
