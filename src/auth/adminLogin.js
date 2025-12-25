const bcrypt = require("bcrypt")
const db = require("../config/database.config")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/app.config")

const adminLogin = async (req, res) => {

    const {
        email,
        password
    } = req.body

    if (!email || !password) {
        return res.status(401).json({
            status: false,
            message: "Invalid field"
        })
    }

    try{

        const user = await getAdminInfo(email)

        const {id, password : hashPassword, name : userName} = user.result[0]

        const passwordMatch = await verifyPassword(password, hashPassword)

        if(!passwordMatch.status){
            return res.status(401).json({
                status: false,
                message: "Email or password does not match"
            })
        }

        const token = jwt.sign({email, id}, JWT_SECRET)
        
        return res.status(200).json({
            status: true,
            token,
            message: "Login successfull",
            user : {
                id, userName, email
            }
        })
        

    }catch(err){
        console.log(err);
        
        return res.status(500).json({
            status: false,
            err,
            message: "Server error"
        })
    }

}


const getAdminInfo = async (email) => {

    return new Promise((resolve, reject) => {

        const query = 'SELECT * FROM admin WHERE email = ?'
    
        db.query(query, [email], (err, result) => {
            if(err){
                console.log(err);
                
                reject({
                    err,
                    status: false,
                    message: "Server error"
                })
            }
            resolve({
                status: true,
                result
            })
        })
    })




}

const verifyPassword = async (plainPassword, hashPassword) => {
    try{

        const match = await bcrypt.compare(plainPassword, hashPassword)

        // console.log(hashPassword);
        

        if(match){
            return {
                status: true
            }
        }

        return {
            status: false
        }


    }catch(err){
        return {
            status: false,
            err,
            message: "Password verification failed"
        }
    }
}

module.exports = adminLogin