const userLogout = (req, res) => {
  
  const token = req.cookies.jwt
  // console.log(token)
  
  res.clearCookie("jwt", {
    secure: false,
    sameSite: "lax",
    httpOnly: true
  })
  
  return res.status(200).json({
    status: true,
    message: "User deleted"
  })
}

module.exports = userLogout