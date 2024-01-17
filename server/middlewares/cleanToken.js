const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cron = require('node-cron')
const { PrismaClient } = require('../prisma/src/prisma/client')
const Joi = require('joi')
const prisma = new PrismaClient()

const scheduleTokenCleanup = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      // Find and delete users with expired tokens
      await prisma.user.deleteMany({
        where: {
          tokenExpiry: {
            lt: new Date(),
          },
        },
      })
      console.log('Expired tokens cleaned up')
    } catch (error) {
      console.error('Error cleaning up expired tokens:', error)
    }
  })
}

module.exports = scheduleTokenCleanup
