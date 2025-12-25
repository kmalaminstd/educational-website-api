const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'alaminkhanstd@gmail.com',
    pass: 'hzwwxuuuwwevzuan'
  }
})