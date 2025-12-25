const bcrypt = require("bcrypt")
const db = require("../config/database.config")
const isExistingUser = require("../lib/verifyExistingUser")

const userRegistration = async (req, res) => {

    try{

        const {name, email, password} = req.body

        const verifyExistingUser = await isExistingUser(email)

        if(verifyExistingUser.length > 0){
            return res.status(401).json({
                status: false,
                message: "User already exist"
            })
        }else{
            if(validateUserInfo(name, email, password)){
        
                const hashPassword = await generateHashPass(password)
    
                if(hashPassword){
    
                    const data = await addUser(name, email, hashPassword)
    
                    // console.log(data);
    
                    return res.status(200).json({data})
                    
    
                }else{
                    return res.status(500).json({
                        status: false,
                        message: "Failed to register user"
                    })
                }
    
                
            }else{
                return res.status(401).json({
                    status: false,
                    message: "Invalid field"
                })
            }
        }
    }catch(err){
        console.log(err);  
        res.json(err)
    }

}

// validate user info
const validateUserInfo = (name, email, password) => {
    if(!name || !email || !password){
        return false
    }
    return true
}

// generate hash password
const generateHashPass = async (plainPassword) => {
    try{
        const hashPass = await bcrypt.hash(plainPassword, 10)
        return hashPass
    }catch(err){
        console.log(err);
        
        return false
    }

}

// submit user data to database
const addUser = async (name, email, password) => {
    
    return new Promise((resolve, reject) => {

        const query = 'INSERT into users (name, email, password) VALUES (?, ?, ?)'

        return db.query(query, [name, email, password], (err, result) => {
            if(err){
                console.log(err);
                
                reject({
                    status: false,
                    err
                })
            }
            resolve({
                status: true,
                result,
                message: "User created"
            }) 
        })
    })

}



module.exports = userRegistration