const bcrypt = require("bcrypt")
const isExistingUser = require("../lib/verifyExistingUser")
const db = require("../config/database.config")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/app.config")

const userLogin = async (req, res) => {

    try{

        const {email, password} = req.body

        // console.log(email, password)
        
        if(await validateInfo(email, password)){
            
            if(await isExistingUser(email)){

                const user = await getUser(email)
                const userInfo = user.result[0]
                // console.log(userInfo)
                if(await verifyPassword(userInfo.password, password)){

                    const token = await generateToken(userInfo.id, userInfo.email, userInfo.name, userInfo.status)

                    res.cookie('jwt', token, {
                        httpOnly: true,
                        sameSite: "lax",
                        priority: "high",
                        secure: false,
                        path: "/",
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    })

                    return res.status(200).json({
                        status: true,
                        message: "Login successfull",
                        token,
                        user: {
                            id: userInfo.id,
                            name: userInfo.name,
                            email: userInfo.email,
                            picture: userInfo.image_link,
                            phone_number: userInfo.phone_number,
                            created_at: userInfo.created_at,
                            bio: userInfo.bio
                        }
                    })

                }else{

                    res.status(401).json({
                        satus: false,
                        message: "Email or password doesn't match"
                    })

                }
                
            }else{
                return res.status(401).json({
                    status: false,
                    message: "Email or password doesn't match"
                })
            }

        }else{
            return res.status(401).json({
                status: false,
                message: "Invalid field"
            })
        }
        

    }catch(err){
        console.log(err);
        res.status(500).json({
            err,
            status: false,
            message: "Login failed"
        })
    }

}

// validate user info
const validateInfo = async (email, password) => {
    if(!email || !password){
        return false
    }
    return true
}

// get user information 
const getUser = async (email) => {
    return new Promise((resolve, reject) =>{
        const query = 'SELECT * FROM users WHERE email = ? LIMIT 1'
        db.query(query, [email], (err, result) => {
            if(err){
              console.log(err)
                reject({
                    status: false,
                    message: "Something went wrong"
                })
            }
            resolve({
                status: true,
                result
            })
        })
    })
}

// verify password 
const verifyPassword = async (hashPass, plainPass) => {
    // console.log(hashPass, plainPass);
    
    try{

        const getVerifyInfo = await bcrypt.compare(plainPass, hashPass)
        return getVerifyInfo
        

    }catch(err){
      console.log(err)
        return {
            err,
            status: false
        }
    }
}

// generate jwt
const generateToken = async (id, email, name, status) => {
    try{

        const token = await jwt.sign({id, email, name, status}, JWT_SECRET)
        return token

    }catch(err){
        console.log(err);
        
        return false
    }
}

module.exports = userLogin