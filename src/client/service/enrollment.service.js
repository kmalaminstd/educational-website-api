const db = require('../../config/database.config')

// create an enrollment
const createEnrollmentService = async (user_id, course_id, amount, method, transaction_id)=>{
  
  return new Promise((resolve, reject) =>{
    const createQuery = `INSERT INTO enrollments (user_id, course_id, enrollment_date, created_at) VALUES (?, ?, NOW(), NOW())`
    
    db.query(createQuery, [user_id, course_id], (err, result) =>{
      if(err){
        console.log("s err ", err)
        return reject({
          status: false,
          err,
          message: "Something went wrong"
        })
      }
      
      createEnrollPayment(user_id, result.insertId, course_id, amount, method, transaction_id)
        .then(paymentDetails => {
          return resolve({
            status: true,
            message: "Course payment success. Wait for confirmation",
            paymentID: paymentDetails.insertId
          })
        })
        .catch(err => {
          return reject({
            status: false, 
            err, 
            message: "Payment creation failed"
          })
        })
    })
  })
}


// create payment
const createEnrollPayment = async (user_id, enrollment_id, course_id, amount, method, transaction_id )=>{
  
  return new Promise((resolve, reject) => {
    const createQuery = 'INSERT into payments (user_id, enrollment_id, course_id, amount, method, transaction_id, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())'
    
    db.query(createQuery, [user_id, enrollment_id, course_id, amount, method, transaction_id], (err, result) => {
      if(err){
        return reject({
          status: false, 
          message: "Something went wrong", 
          err
        })
      }
      
      return resolve(result)
    })
  })
}

// get all enrollments for admin
const allEnrollmentForAdminService = async (page = 1) => {
  const limit = 10
  const offset = (page - 1) * limit
  
  return new Promise((resolve, reject) => {
    const countQuery = `SELECT COUNT(*) AS totalItems FROM enrollments`
    db.query(countQuery, (err, result) => {
      if(err){
        console.log(err)
        reject({
          status: false,
          err,
          message: "Something went wrong"
        })
      }
      const totalItems = result[0].totalItems
      const totalPages = Math.ceil(totalItems / limit)
      const getItemsQuery = `SELECT 
          e.*, 
          ct.name AS category_name, 
          u.name AS user_name, 
          u.email, 
          u.role, 
          u.country, 
          u.status AS userStatus, 
          c.title AS course_title, 
          c.price, 
          c.active AS courseStatus
        FROM enrollments e 
        JOIN users u ON e.user_id = u.id 
        JOIN courses c ON e.course_id = c.id 
        JOIN categories ct ON c.category_id = ct.id 
        ORDER BY e.created_at DESC 
        LIMIT ? OFFSET ?`
      db.query(getItemsQuery, [limit, offset], (err, result) => {
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
            message: "Enrollment found",
            pagination: {
              totalPages,
              totalItems,
              currentPage: page,
              limit
            }
          })
      })
    })
  })
}

// get enrollment Details
const enrollmentDetailsService = async (id) => {
  // console.log(id)
  return new Promise((resolve, reject) => {
    
    const query = `SELECT 
      e.*, 
      c.title, 
      c.image, 
      c.price AS course_price, 
      ct.name AS course_category, 
      p.account_number, 
      p.account_type, 
      p.amount AS paid_amount, 
      p.method AS payment_method,
      p.transaction_id, 
      p.status AS payment_status, 
      u.name AS user_name, 
      u.email, 
      u.role
    FROM enrollments e 
    JOIN users u ON e.user_id = u.id 
    JOIN courses c ON e.course_id = c.id 
    JOIN categories ct ON c.category_id = ct.id 
    JOIN payments p ON p.enrollment_id = e.id 
    WHERE e.id = ?
    `
    
    db.query(query, [id], (err, result) => {
      if(err){
        console.log(err)
        reject({status: false, err, message: "Something went wrong"})
      }
      // console.log(result)
      resolve({
        status: true,
        result: result[0]
      })
    })
    
  })
}

module.exports = {
  createEnrollmentService,
  allEnrollmentForAdminService,
  enrollmentDetailsService
}