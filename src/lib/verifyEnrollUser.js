const db = require('../config/database.config')

const isUserEnrolled = async (user_id, course_id) =>{
  
  
  return new Promise((resolve, reject) =>{ 
    if(!user_id || !course_id){
      return resolve(false)
    }
    const verifyQuery = `SELECT * FROM enrollments WHERE user_id = ? AND course_id = ? AND status = 'active'`
    db.query(verifyQuery, [user_id, course_id], (err, result) => {
      if(err){
        console.log(err)
        return reject(false)
      }
      
      if(result.length > 0){
        return resolve(true)
      }
      
      return resolve(false)
      
      // console.log(result)
      // result.forEach(enroll => {
      //   if(enroll) resolve(true)
      // })
    })
  })
  
}

module.exports = isUserEnrolled