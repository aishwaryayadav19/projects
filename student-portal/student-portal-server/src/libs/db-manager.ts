import config from '../config'
import * as mysql from 'mysql2/promise'

const { db: { mysql: { host, port, user, password } = {} } = {} } = config

let dbConn: any = null

const _initConn = async () => {
  try {
    dbConn = await mysql.createConnection({ host, port, user, password, multipleStatements: true })
    return dbConn
  } catch (e) {
    throw e
  }
}

const _Conn = async () => {
  try {
    const activeConn = dbConn ? dbConn : await _initConn()
    return activeConn
  } catch (e) {
    throw e
  }
}

const execQuery = async (query: string, data: Array<any>, transConn = null) => {
  let activeConn = null
  try {
    activeConn = transConn ? transConn : await _Conn()
    const [results, fields] = await activeConn.execute(query, data)
    return { results, fields }
  } catch (e) {
    throw e
  } finally {
    dbConn = null
    activeConn && activeConn.end()
  }
}

//Added another query function to call the query method of mysql instead of the execute method since there are certain features of mysql that work with query and not execute
const runQuery = async (query: string, data: Array<any>, transConn = null) => {
  let activeConn = null
  try {
    activeConn = transConn ? transConn : await _Conn()
    const [results, fields] = await activeConn.query(query, data)
    return { results, fields }
  } catch (e) {
    throw e
  } finally {
    dbConn = null
    activeConn && activeConn.end()
  }
}

export interface IExecQueriesInput {
  query: string
  data: any[]
}

/**
 * Function to run a list of queries on a single db connection!
 * @param queriesAndData Array of objects which have the query and respective data to make the prepared statements
 * @param crucialQueryIndex This index is the crucial query index (In the array of queriesAndData)  which HAS TO return data for the subsequent queries to run. If this crucial query returns no data, the subsequent queries will not run. Thus saving unnecessary query calls!
 */
const execReadQueries = async (queriesAndData: IExecQueriesInput[], crucialQueryIndex?: number) => {
  let activeConn = null
  try {
    activeConn = await _Conn()
    let finalQueryOutputs: { results: any[]; fields: any }[] = []

    for (let i = 0; i < queriesAndData.length; i++) {
      const [results, fields] = await activeConn.execute(queriesAndData[i].query, queriesAndData[i].data)
      finalQueryOutputs.push({ results, fields })
      if (typeof crucialQueryIndex !== 'undefined' && i === crucialQueryIndex && results.length === 0) break
    }

    return finalQueryOutputs
  } catch (e) {
    throw e
  } finally {
    dbConn = null
    activeConn && activeConn.end()
  }
}

export { execQuery, runQuery, execReadQueries }
