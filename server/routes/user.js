const express = require('express')
const { PrismaClient } = require('../prisma/src/prisma/client')
const login = require('../controllers/user')
const Router = express.Router()

Router.post('/', login)

module.exports = Router
