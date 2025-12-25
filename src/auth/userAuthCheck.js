const { JWT_SECRET } = require("../config/app.config")
const jwt = require("jsonwebtoken")

module.exports = async (req, res) => {
  const token = req.cookies.jwt
  // console.log(token)
  
  if(!token){
    return res.status(401).json({
      status: false,
      message: "User not logged in"
    })
  }
  
  try{
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if(err){
        console.log(err)
        return res.status(401).json({
          status: false,
          message: "User error",
          err
        })
      }
      
      
      if(decoded){
        // console.log(decoded)
        return res.status(200).json({
          status: true,
          message: "User logged in",
          user : decoded
        })
      }
      
    })
    
  }catch(err){
    console.log(err)
    return res.status(500).json({
      status: false,
      message: "Server error",
      err
    })
  }
}