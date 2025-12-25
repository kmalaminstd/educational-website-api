const db = require("../../config/database.config")

const overviewStatsService = async () => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT 
          (SELECT COUNT(*) from users) AS total_users,
          (SELECT COUNT(*) FROM courses) AS total_courses,
          (SELECT COUNT(*) FROM enrollments WHERE isPaid = 'paid') AS total_orders,
          (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE status = 'success') AS total_revenue;
    `
    db.query(query, (err, result) => {
      if(err){
        console.log(err)
        reject({
          status: false,
          err,
          message: 'Something went wrong'
        })
      }
      resolve({
        result,
        status: true,
        message: 'Info found'
      })
    })
  })
}

const twoMonthComparisionStatsService = async () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        (
          SELECT COALESCE(SUM(amount), 0)
          FROM payments
          WHERE status = 'success'
            AND MONTH(created_at) = MONTH(CURRENT_DATE)
            AND YEAR(created_at) = YEAR(CURRENT_DATE)
        ) AS current_month_revenue,
      
        (
          SELECT COUNT(*)
          FROM enrollments
          WHERE isPaid = 'paid'
            AND MONTH(created_at) = MONTH(CURRENT_DATE)
            AND YEAR(created_at) = YEAR(CURRENT_DATE)
        ) AS current_month_orders,
      
        (
          SELECT COUNT(*)
          FROM users
          WHERE active = 1
            AND MONTH(created_at) = MONTH(CURRENT_DATE)
            AND YEAR(created_at) = YEAR(CURRENT_DATE)
        ) AS current_month_users,
      
        (
          SELECT COALESCE(SUM(amount), 0)
          FROM payments
          WHERE status = 'success'
            AND created_at >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
            AND created_at <  DATE_FORMAT(CURDATE(), '%Y-%m-01')
        ) AS current_month_revenue,
      
        (
          SELECT COALESCE(SUM(amount), 0)
          FROM payments
          WHERE status = 'success'
            AND created_at >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
            AND created_at <  DATE_FORMAT(CURDATE(), '%Y-%m-01')
        ) AS last_month_revenue,
        
        (
          SELECT COUNT(*)
          FROM enrollments
          WHERE isPaid = 'paid'
            AND created_at >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
            AND created_at <  DATE_FORMAT(CURDATE(), '%Y-%m-01')
        ) AS last_month_orders,
      
        (
          SELECT COUNT(*)
          FROM courses
          WHERE active = 1
            AND created_at >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
            AND created_at <  DATE_FORMAT(CURDATE(), '%Y-%m-01')
        ) AS last_month_courses,
        (
          SELECT COUNT(*)
          FROM users
          WHERE created_at >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
            AND created_at <  DATE_FORMAT(CURDATE(), '%Y-%m-01')
        ) AS last_month_users
      `
    db.query(query, (err, result) => {
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
        result: result[0],
        message: "Info found"
      })
    })
  })
}

module.exports = {
  overviewStatsService,
  twoMonthComparisionStatsService
}