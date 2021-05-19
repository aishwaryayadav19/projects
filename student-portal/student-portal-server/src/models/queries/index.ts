import { IConstructQueryInput } from '../interfaces/IQueries'
import * as commonQueries from './common'

const queries = {
  ...commonQueries
}

export const constructQuery = ({ query, dbName, finalKey, params, proxySQLId }: IConstructQueryInput) =>
  queries[query]({ dbName, finalKey, params, proxySQLId })
