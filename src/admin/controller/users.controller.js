const { getAllUsersService, changeUserStatusService, userDetailsAdminService } = require("../service/users.service")

const getAllUsersController = async ( req, res ) => {
  let {page} = req.params
  
  if(!page) page = 1
  
  try{
    
    const data = await getAllUsersService()
    
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

const changeUserStatusController = async (req, res) => {
  const {id} = req.params
  const {status} = req.body
  
  const expectedStatus = ['active', 'banned', 'blocked']
  
  if(!id || !status){
    return res.status(400).json({
      status: false,
      message: "Invalid Credentials"
    })
  }
  
  // console.log(id, status)
  
  if(!expectedStatus.includes(status)){
    {
      return res.status(400).json({
        status: false,
        message: "Invalid status"
      })
    }  
  }
  
  try{
    const data = await changeUserStatusService(status, id)
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

const userDetailsAdminController = async (req, res) => {
  const {id} = req.params
  // console.log(id)
  if(!id){
    return res.status(400).json({
      status: false,
      message: 'Invalid credentials'
    })
  }
  
  try{
    
    const data = await userDetailsAdminService(id)
    
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

module.exports = {
  getAllUsersController,
  changeUserStatusController,
  userDetailsAdminController
}