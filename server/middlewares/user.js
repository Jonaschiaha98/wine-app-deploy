const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Middleware to verify JWT token
const authenticateUser = async (req, res, next) => {
  let token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    token = token.replace(/^Bearer /, '')
    const tokenSearched = await prisma.user.findFirst({
      where: { token: token },
    })
    if (!tokenSearched) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = authenticateUser
