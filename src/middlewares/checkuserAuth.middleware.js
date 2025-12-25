const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/app.config");



const checkUserAuth = async (req, res, next) => {
  try {


    // Extract token
    let token = req.cookies.jwt;

    
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    
    // console.log(token)
    
    if(!token){
      return res.status(401).json({
        status: false,
        message: "Unauthorized: Missing or invalid token",
      })
    }

    // console.log(token)

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach decoded payload (e.g., user email/id) to request
    req.user = decoded;

    next(); // proceed to the next middleware or route handler
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
      error: err.message,
    });
  }
};

module.exports = checkUserAuth;
