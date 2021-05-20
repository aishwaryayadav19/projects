export interface IQueryInput {
  dbName: string
  finalKey?: string
  params?: any
  proxySQLId?: string
}

export interface IConstructQueryInput extends IQueryInput {
  query: string
}
