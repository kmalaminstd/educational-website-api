const db = require('../config/database.config')
const enroll_template = require('../email_templates/enroll_template')
const emailTransport = require('./setup')

const getData = async (user_id)=> {
  
  return new Promise((resolve, reject) => {
    
    const query = `SELECT u.name, u.email, e.isPaid, c.title, ct.name AS category_name FROM users u JOIN enrollments e ON e.user_id = u.id JOIN courses c ON e.course_id = c.id JOIN categories ct ON c.category_id = ct.id WHERE u.id = ?`
    
    db.query(query, [user_id], (err, result) => {
      if(err){
        console.log(err)
        reject({
          status: false,
          err
        })
      }
      resolve({
        status: true,
        result: result[0]
      })
    })
    
  })
}

const sendEnrollMail = async (user_id) => {
  try{
    
    const data = await getData(user_id)
    
    if(data.status){
      
      const {result} = data
      
      await emailTransport.sendMail({
        from : 'alaminkhanstd@gmail.com',
        subject: 'Course enrollment',
        to: result.email,
        html: enroll_template(result.title, result.category_name, result.isPaid, result.name)
      })
    }
    // console.log(data)
  }catch(err){
    console.log(err)
  }
}

module.exports = sendEnrollMail