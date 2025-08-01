import express from 'express'
import router from './api/endPoints.js'
import cors from 'cors'
import 'dotenv/config'

const app = express()
app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PATCH']
  })
)

app.use('/api', router)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`)
})
