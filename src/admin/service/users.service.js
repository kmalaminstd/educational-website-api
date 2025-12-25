const db = require('../../config/database.config')

const getAllUsersService = async (page = 1) => {
  
  const currentPage = page
  const limit = 20
  
  let totalUsers, totalPages
  
  const offset = (page - 1) * limit
  
  return new Promise((resolve, reject) => {
    const countQuery = `SELECT COUNT(*) as total FROM users`
    db.query(countQuery, (err, result) => {
      if(err){
        console.log(err)
        reject({
          status: false,
          err,
          message: "Users count error"
        })
      }
      totalUsers = result[0].total
      totalPages = Math.ceil(totalUsers / limit)
      
      const userQuery = `SELECT * FROM Users ORDER BY created_at DESC LIMIT ? OFFSET ?`
      db.query(userQuery, [limit, offset], (err, result) => {
        if(err){
          console.log(err)
          reject({
            status: false,
            err,
            message: "Something went wrong"
          })
        }
        resolve({
          status: true,
          result,
          pagination: {
            currentPage,
            limit,
            totalPages,
            totalUsers
          }
        })
      })
      
    })
    
  })
}

// change user status active banned blocke
const changeUserStatusService = async (status, id) => {
  // console.log(status, id)
  return new Promise((resolve, reject) => {
    const query = `UPDATE users SET status = ? WHERE id = ?`
    db.query(query, [status, id] , (err, result) => {
      if(err){
        console.log(err)
        reject({
          status: false,
          err,
          message: "Something went wrong"
        })
      }
      // console.log(result)
      resolve({
        status: true,
        message: "User status changed"
      })
    })
  })
}

// user's all details for admin
const userDetailsAdminService = async (id) => {
  // console.log(id)
  return new Promise((resolve, reject) => {
    const counctCourseEnQuery = `SELECT COUNT(*) AS totalEnrolled FROM enrollments WHERE user_id = ?`
    const courseQuery = `SELECT c.title AS course_name, c.active AS course_status FROM courses c JOIN enrollments e ON e.course_id = c.id WHERE e.user_id = ? `
    const query = `
      SELECT 
        u.id AS user_id,
        u.created_at AS joinedAt,
        u.name AS user_name,
        u.email AS user_email,
        u.role,
        u.country,
        u.bio,
        u.phone_number,
        u.profile_image,
        u.status AS user_status,
        IFNULL(SUM(DISTINCT p.amount), 0) AS total_amount
      FROM users u
      LEFT JOIN enrollments e ON u.id = e.user_id
      LEFT JOIN payments p 
        ON p.user_id = u.id AND p.status = 'success'
      WHERE u.id = ?
      GROUP BY u.id
      `
    db.query(query, [id], (err, result) => {
      if(err){
        console.log(err)
        reject({
          status: false,
          err,
          message: "Something went wrong"
        })
      }
      // console.log(result)
      db.query(counctCourseEnQuery, [id], (err, cresult) => {
        if(err){
          console.log(err)
          reject({
            status: false,
            err,
            message: "Something went wrong"
          })
        }
        // console.log(cresult[0].totalEnrolled)
        
        result[0].totalCourses = cresult[0].totalEnrolled
        
        db.query(courseQuery, [id], (err, courseresult) => {
          if(err){
            console.log(err)
            reject({
              status: false,
              err,
              message: "Something went wrong"
            })
          }
          // console.log(courseresult)
          result[0].courses = courseresult
          resolve({
            status: true,
            message: "Info found",
            result: result[0]
          })
        })
        
      })
      
    })
  })
}

module.exports = {
  getAllUsersService,
  changeUserStatusService,
  userDetailsAdminService
}