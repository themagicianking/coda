import express from 'express'
import cors from 'cors'
import pkg from 'pg'
import 'dotenv/config'

const APP = express()
const PORT = 5000
const { Pool } = pkg
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD
})

APP.use(cors())
APP.use(express())

APP.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
