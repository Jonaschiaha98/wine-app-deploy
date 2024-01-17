const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cron = require('node-cron')
const cors = require('cors')
const { PrismaClient } = require('../prisma/src/prisma/client')
const Joi = require('joi')
const prisma = new PrismaClient()

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      // Generate a JWT
      const token = jwt.sign({ userEamil: email }, 'your-secret-key', {
        expiresIn: '1h', // Token expiration time
      })
      // If user doesn't exist, create a new user
      user = await prisma.user.create({
        data: {
          email,
          password: bcrypt.hashSync(password, 10),
          token,
          tokenExpiry: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour expiry
        },
      })
      return res.status(200).json(user)
    } else if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' })
    } else {
      // If user exists, update the token
      const token = jwt.sign({ userEamil: email }, 'your-secret-key', {
        expiresIn: '1h', // Token expiration time
      })
      const ok = (user = await prisma.user.update({
        where: { email: user.email },
        data: {
          token: token,
          tokenExpiry: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour expiry
        },
      }))
      // Return the token to the client
      return res.status(200).json(token)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = login
