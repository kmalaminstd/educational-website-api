const db = require('../../config/database.config')

// get all payment list
const getAllPaymentForAdminService = async (page = 1) => {
  
  const limit = 10
  const offset = (page - 1) * limit
  
  
  return new Promise((resolve, reject) => {
    const countQuery = `SELECT COUNT(*) as total FROM payments`
    db.query(countQuery, (err, result) => {
      if(err){
        return reject({
          status: false,
          err,
          message: "Something went wrong"
        })
      }
      const totalItems = result[0].total
      const totalPages = Math.ceil(totalItems / limit)
      const query = `SELECT p.* , u.name, u.email FROM payments p JOIN users u ON p.user_id = u.id ORDER BY created_at DESC LIMIT ? OFFSET ?`
      db.query(query, [limit, offset], (err, result) => {
        if(err){
          return reject({
            status: false,
            err,
            message: "Something went wrong"
          })
        }
        return resolve({
          status: true,
          result,
          pagination: {
            totalItems,
            currentPage : page,
            itemsPerPage : limit,
            totalPages
          }
        })
      })
    })
  })
}

const getAllPaymentForAdminDownloadService = async () => {
  
  
  return new Promise((resolve, reject) => {
    const countQuery = `SELECT COUNT(*) as total FROM payments`
    db.query(countQuery, (err, result) => {
      if(err){
        return reject({
          status: false,
          err,
          message: "Something went wrong"
        })
      }
      
      const query = `SELECT p.* , u.name, u.email FROM payments p JOIN users u ON p.user_id = u.id ORDER BY created_at DESC`
      db.query(query, (err, result) => {
        if(err){
          return reject({
            status: false,
            err,
            message: "Something went wrong"
          })
        }
        return resolve({
          status: true,
          result
        })
      })
    })
  })
}

// details of payment
const paymentDetailsService = async (payment_id, user_id, course_id) => {
  // console.log(payment_id, user_id, course_id)
  return new Promise((resolve, reject) => {
    const query = `SELECT p.*, u.name, u.email, c.title AS course_name, c.price AS coursePrice FROM payments p JOIN users u ON p.user_id = u.id JOIN courses c ON p.course_id = c.id WHERE p.id = ? AND p.user_id = ? AND p.course_id = ?`
    db.query(query, [payment_id, user_id, course_id], (err, result) => {
      if(err){
        console.log(err)
        return reject({
          status: false, 
          err, 
          message: "Something went wrong"
        })
      }
        // console.log(result)
        return resolve({
          status: true,
          result: result[0]
        })
    })
  })
}

// change payment status by admin
const changePaymentStatusServiceByAdmin = async (payment_id, course_id, user_id, payment_status) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE payments SET status = ? WHERE id = ? AND user_id = ? AND course_id`
    db.query(query, [payment_status, payment_id, user_id, course_id], (err, result) => {
      if(err){
        console.log(err)
        return reject({
          status: false,
          err,
          message: "Something went wrong"
        })
      }
      
      return resolve({
        status: true,
        result,
        message: "Course status changed"
      })
    })
  })
} 

// change enrollment status depend on payment status
const changeEnrollStatusOnPaymentStatusService = async (user_id, course_id, payment_id) => {
  
  
  return new Promise((resolve, reject) => {
    db.query(`SELECT enrollment_id FROM payments WHERE id = ?`, [payment_id], (err, result) => {
      if(err){
        console.log(err)
        reject({
          status: false,
          err, 
          message: "Enrollment not changed"
        })
      }
      const {enrollment_id} = result[0]
      // console.log(enrollment_id)
      const enrollQuery = `UPDATE enrollments SET status = ?, isPaid = ? WHERE id = ?`
      db.query(enrollQuery, ['active', 'paid',enrollment_id], (err, result) => {
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
          message: "Enrollment is active"
        })
      })
    })
  })
}

// change enrollment status if update the payment status
const changeEnrollStatusOnUpdatePaymentStatusService = async (user_id, course_id, payment_id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT enrollment_id FROM payments WHERE id = ?`, [payment_id], (err, result) => {
      if(err){
        console.log(err)
        reject({
          status: false,
          err, 
          message: "Enrollment not changed"
        })
      }
      const {enrollment_id} = result[0]
      // console.log(enrollment_id)
      const enrollQuery = `UPDATE enrollments SET status = ?, isPaid = ? WHERE id = ?`
      db.query(enrollQuery, ['pending', 'unpaid',enrollment_id], (err, result) => {
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
          message: "Enrollment is active"
        })
      })
    })
  })
}

const getAllPaymentInfoOfUserService = async (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT p.amount, p.method, p.status AS payment_status, e.status AS enrollment_status, e.isPaid as course_paid, p.created_at AS payment_date, c.title AS course_name FROM payments p JOIN enrollments e ON p.enrollment_id = e.id JOIN courses c ON p.course_id = c.id WHERE p.user_id = ?`
    db.query(query, [user_id], ((err, result) => {
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
        message: "Payment found",
        result
      })
    }))
  })
}

// payment overview
const paymentOverviewService = async (id) => {
  
  const total_pending_pay = await totalAmountByStatusService(id, 'pending')
  const total_success_pay = await totalAmountByStatusService(id, 'success')
  const total_failed_pay = await totalAmountByStatusService(id, 'failed')
  const total_refund_pay = await totalAmountByStatusService(id, 'refunded')
  
  let total_pay_amount;
  
    total_pay_amount = total_pending_pay + total_success_pay + total_failed_pay + total_refund_pay
  // if(total_pending_pay && total_success_pay && total_failed_pay && total_refund_pay){
  // }
  
  // console.log(total_pending_pay, total_success_pay, total_failed_pay, total_refund_pay)
  
  return new Promise((resolve, reject) => {
    // if(!total_pending_pay || !total_success_pay || !total_failed_pay || !total_refund_pay){
    //   reject({
    //     status: false,
    //     message: "Something went wrong"
    //   })
    // }
    resolve({
      status: false,
      result: {
        total_paid_amount: total_pay_amount,
        total_pending_pay,
        total_success_pay,
        total_failed_pay,
        total_refund_pay
      }
    })
  })
}

const totalAmountByStatusService = async (id, status) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT IFNULL(SUM(amount), 0) AS total_amount FROM payments WHERE user_id = ? AND status = ?`
    db.query(query, [id, status], (err, result) => {
      if(err){
        console.log(err)
        reject(false)
      }
      // console.log(result[0].total_amount)
      resolve(result[0].total_amount)
    })
  })
}
  
module.exports = {
  getAllPaymentForAdminService,
  paymentDetailsService,
  changePaymentStatusServiceByAdmin,
  changeEnrollStatusOnPaymentStatusService,
  changeEnrollStatusOnUpdatePaymentStatusService,
  getAllPaymentInfoOfUserService,
  paymentOverviewService,
  getAllPaymentForAdminDownloadService
}