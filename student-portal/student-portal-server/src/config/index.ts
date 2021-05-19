const config = () => {
  return {
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT) || 8484,
    mordorBaseUrl: process.env.MORDOR_BASE_URL || 'http://localhost:8282',
    retryErrorFetchLimit: process.env.RETRY_ERR_FETCH_LIMIT || 3,
    envName: process.env.NODE_ENV || '',
    bodyParser: {
      jsonLimit: process.env.BODYPARSER_JSON_LIMIT || '10mb'
    },
    db: {
      mysql: {
        host: process.env.MYSQL_HOST || 'localhost', // mysql proxy host
        port: Number(process.env.MYSQL_PORT) || 3306,
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'root123'
      }
    }
  }
}
export default config()
