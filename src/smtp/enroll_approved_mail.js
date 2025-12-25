const db = require('../config/database.config')
const paymentSuccess = require('../email_templates/payment_success')
const emailTransport = require('./setup')

const getData = async (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT u.name, u.email, c.title FROM users u JOIN enrollments e ON e.user_id = u.id JOIN courses c ON c.id = e.course_id WHERE u.id = ?`
    db.query(query, [user_id], (err, result) => {
      if(err){
        console.log(err)
        reject({
          status: false
        })
      }
      resolve({
        status: true,
        result: result[0]
      })
    })
  })
}

const sendEnrollApprovedEmail = async (user_id) => {
  try{
    const data = await getData(user_id)
    if(data.status){
      const {result} = data
      await emailTransport.sendMail({
        from: 'alaminkhanstd@gmail.com',
        to: result.email,
        subject: 'Payment approve',
        html: paymentSuccess(result.name, result.title)
      })
      
    }
  }catch(err){
    console.log(err)
  }
}

module.exports = sendEnrollApprovedEmail