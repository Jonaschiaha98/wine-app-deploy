const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cron = require('node-cron')
const cors = require('cors')
const { PrismaClient } = require('../prisma/src/prisma/client')
const Joi = require('joi')
const prisma = new PrismaClient()

// Joi schema for wine validation
const wineSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
  type: Joi.string().required(),
  varietal: Joi.string().required(),
  rating: Joi.number().min(1).max(5),
  consumed: Joi.boolean(),
  dateConsumed: Joi.date().when('consumed', { is: true, then: Joi.required() }),
})

// Get all wines
const getWines = async (req, res) => {
  try {
    const wines = await prisma.wine.findFirst()
    if (!wines) {
      return res.json('no wine details found')
    }
    res.json(wines)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Add a new wine with Joi validation
const createWine = async (req, res) => {
  const { error } = wineSchema.validate(req.body)
  console.log(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }
  const { name, year, type, varietal, rating, consumed, dateConsumed } =
    req.body
  try {
    const newWine = await prisma.wine.create({
      data: {
        name,
        year,
        type,
        varietal,
        rating,
        consumed,
        dateConsumed,
      },
    })
    res.json(newWine)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Update a specific wine by ID
const updateWine = async (req, res) => {
  const { id } = req.params

  // Validate request body using Joi
  const { error } = wineSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  const { name, year, type, varietal, rating, consumed, dateConsumed } =
    req.body

  try {
    const updatedWine = await prisma.wine.update({
      where: { id: parseInt(id) },
      data: { name, year, type, varietal, rating, consumed, dateConsumed },
    })

    res.json(updatedWine)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Delete a specific wine by ID
const deletWine = async (req, res) => {
  authenticateUser(req, res, next)
  const { id } = req.params

  try {
    await prisma.wine.delete({
      where: { id: parseInt(id) },
    })

    res.json({ message: 'Wine deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = { getWines, createWine, updateWine, deletWine }
