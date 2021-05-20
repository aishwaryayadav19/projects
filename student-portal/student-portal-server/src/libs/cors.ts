import cors from 'cors'
import express from 'express'

const router = express.Router()

//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'Content-Type', 'Accept'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: ['http://localhost:8182'],
  preflightContinue: false
}

//use cors middleware
router.use(cors(options))

//add your routes

//enable pre-flight
// router.options('*', cors(options))

export default router
