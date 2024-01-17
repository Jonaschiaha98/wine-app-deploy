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
    const decoded = jwt.verify(token, 'your-secret-key')
    // console.log(decoded)
    req.userEmail = decoded.userEmail
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = authenticateUser
