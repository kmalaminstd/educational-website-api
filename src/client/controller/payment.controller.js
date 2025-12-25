const sendEnrollApprovedEmail = require('../../smtp/enroll_approved_mail')
const sendPaymentFaillMail = require('../../smtp/payment_failed')
const paymentRefundMail = require('../../smtp/payment_refund')
const {downloadPaymentInfo, paymentworkbook} = require('../../lib/download_payment_data')
const {getAllPaymentForAdminService, paymentDetailsService, changePaymentStatusServiceByAdmin, changeEnrollStatusOnPaymentStatusService, changeEnrollStatusOnUpdatePaymentStatusService, getAllPaymentInfoOfUserService, paymentOverviewService, getAllPaymentForAdminDownloadService} = require('../service/payment.service')
const ExcelJS = require("exceljs");

const getAllPaymentForAdminConroller = async (req, res) => {
  
  const {page} = req.params
  
  
  try{
    
    const data = await getAllPaymentForAdminService(page)
    return res.status(200).json(data)
    
  }catch(err){
    return res.status(500).json({
      status: false,
      message: "Server error",
      err
    })
  }
}

const downloadPaymentForAdminController = async (req, res) => {
  try {
      const data = await getAllPaymentForAdminDownloadService();
      if (!data.status) {
        return res.status(400).json({ status: false });
      }
  
      const workbook = new ExcelJS.Workbook();
      workbook.creator = "Edulearn";
  
      const worksheet = workbook.addWorksheet("Payments");
  
      worksheet.columns = [
        { header: "#", key: "index", width: 5 },
        { header: "User", key: "user", width: 25 },
        { header: "Email", key: "email", width: 30 },
        { header: "Date", key: "date", width: 35 },
        { header: "Amount ($)", key: "amount", width: 15 },
        { header: "Method", key: "method", width: 15 },
        { header: "Status", key: "status", width: 15 },
      ];
  
      data.result.forEach((item, index) => {
        worksheet.addRow({
          index: index + 1,
          user: item.name,
          email: item.email,
          date: item.created_at,
          amount: item.amount,
          method: item.method,
          status: item.status,
        });
      });
  
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=payments.xlsx"
      );
  
      await workbook.xlsx.write(res);
      res.end();
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false });
    }
}

const getPaymentDetailsForAdminController = async (req, res) => {
  const { payment_id, user_id, course_id } = req.params
  
  // console.log(payment_id, user_id, course_id)
  
  if (!payment_id || !user_id || !course_id) {
    return res.status(401).json({
      status: false,
      message: "Invalid credentials"
    })
  }
  
  try{
    const data = await paymentDetailsService(payment_id, user_id, course_id)
    return res.status(200).json(data)
  }catch(err){
    console.log(err)
    return res.status(500).json({
      status: false,
      message: "Server error",
      err
    })
  }

}

const changePaymentStatusByAdminController = async (req, res) => {
  const {user_id, course_id, payment_id} = req.params
  const {payment_status} = req.body
  
  const expectedStatus = [
    'pending',
    'success',
    'failed',
    'refunded'
  ]
  
  if(!payment_status || !user_id || !course_id || !payment_id){
    return res.status(401).json({
      status: false,
      message: "Invalid credentials"
    })
  }
  
  if(!expectedStatus.includes(payment_status)){
    return res.status(401).json({
      status: false,
      message: "Payment status not granted"
    })
  }
  
  
  try{
    
    const data = await changePaymentStatusServiceByAdmin(payment_id, course_id, user_id, payment_status)
    if(payment_status === "success"){
      await changeEnrollStatusOnPaymentStatusService(user_id, course_id, payment_id)
    }else{
      await changeEnrollStatusOnUpdatePaymentStatusService(user_id, course_id, payment_id)
    }
    
    if(data.status && payment_status === 'success'){
      await sendEnrollApprovedEmail(user_id)
    }
    
    if(data.status && payment_status === 'failed'){
      await sendPaymentFaillMail(user_id)
    }
    
    if(data.status && payment_status === 'refunded'){
      await paymentRefundMail(user_id)
    }
    
    return res.status(200).json(data)
    
  }catch(err){
    console.log(err)
    return res.status(500).json({
      status: false,
      err,
      message: "Server error"
    })
  }
  
}

// get all payment info of a user
const getAllPaymentInfoOfUserController = async (req, res) => {
  const {user_id} = req.params
  if(!user_id){
    return res.status(401).json({
      status: false,
      message: "Invalid credentials"
    })
  }
  
  try{
    
    const data = await getAllPaymentInfoOfUserService(user_id)
    return res.status(200).json(data)
    
  }catch(err){
    console.log(err)
    return res.status(500).json({
      status: false,
      err,
      message: 'Server error'
    })
  }
}

const paymentOverviewController = async (req, res) => {
  const {id} = req.params
  
  if(!id){
    return res.status(401).json({
      status: false,
      message: "Invalid credentials"
    })
  }
  
  try{
    
    const data = await paymentOverviewService(id)
    return res.status(200).json(data)
    
  }catch(err){
    console.log(err)
    return res.status(500).json({
      status: false,
      err,
      message: "Server error"
    })
  }
}

module.exports = {
  getAllPaymentForAdminConroller,
  getPaymentDetailsForAdminController,
  changePaymentStatusByAdminController,
  getAllPaymentInfoOfUserController,
  paymentOverviewController,
  downloadPaymentForAdminController
}