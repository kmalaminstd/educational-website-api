const sendEnrollMail = require('../../smtp/enrollment_mail')
const {createEnrollmentService, allEnrollmentForAdminService, enrollmentDetailsService} = require('../service/enrollment.service')


// create enrollment controller
const createEnrollmentController = async ( req, res ) => {
  
  const {user_id, course_id, amount, method, transaction_id, account_type} = req.body
  
  try{
    
    const data = await createEnrollmentService(user_id, course_id, amount, method, transaction_id, account_type)
    
    // console.log(data)
    
    if(data.status){
      await sendEnrollMail(user_id)
    }
    
    return res.status(200).json(data)
    
  }catch(err){
    console.log(err)
    return res.status(500).json({status: false, message: "Server error"})
  }
}

// get all enrollment
const getAllEnrollmentForAdminController = async (req, res) => {
  
  let page = req.params.page 
  
  if(!page){
    page = 1
  }
  
  try{
    
    const data = await allEnrollmentForAdminService(page)
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

// enrollment details
const getEnrollmentDetailsController = async (req, res) => {
  const {enroll_id} = req.params 
  if(!enroll_id){
    return res.status(400).json({
      status: false,
      message: "Invalid credentials"
    })
  } 
  try{
    const data = await enrollmentDetailsService(enroll_id)
    // console.log(data)
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
  createEnrollmentController,
  getAllEnrollmentForAdminController,
  getEnrollmentDetailsController
}