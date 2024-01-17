const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cron = require('node-cron')
const cors = require('cors')
const { PrismaClient } = require('./prisma/src/prisma/client')
const Joi = require('joi')
const auth = require('./middlewares/user.js')
const scheduleTokenCleanup = require('./middlewares/cleanToken.js')
const prisma = new PrismaClient()
const app = express()
const userRouter = require('./routes/user.js')
const wineRouter = require('./routes/wine.js')
const PORT = process.env.PORT || 3000

scheduleTokenCleanup()
app.use(cors())
app.use(express.json())
app.use('/api/login', userRouter)
app.use('/api/wines', auth, wineRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
