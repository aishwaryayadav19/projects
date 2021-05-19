const config = () => {
  return {
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT) || 8484,
    bodyParser: {
      jsonLimit: process.env.BODYPARSER_JSON_LIMIT || '10mb'
    },
    db: {
      mysql: {
        host: process.env.MYSQL_HOST || 'localhost', // mysql proxy host
        port: Number(process.env.MYSQL_PORT) || 3306,
        user: process.env.MYSQL_USER || '',
        password: process.env.MYSQL_PASSWORD || ''
      }
    }
  }
}
export default config()
