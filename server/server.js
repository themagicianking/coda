import express from 'express'
import cors from 'cors'
const APP = express()
const PORT = 5000

APP.use(cors())
APP.use(express())

APP.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
