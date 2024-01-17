const express = require('express')
const { PrismaClient } = require('../prisma/src/prisma/client')
const {
  getWines,
  createWine,
  updateWine,
  deletWine,
} = require('../controllers/wine')
const Router = express.Router()

Router.get('/', getWines)
Router.post('/', createWine)
Router.put('/:id', updateWine)
Router.delete('/:id', deletWine)

module.exports = Router
