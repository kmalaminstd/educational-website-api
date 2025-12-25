const bcrypt = require('bcrypt')

const generateHashPassword = async (req, res) => {

    const {password} = req.body

    if(!password){
        return
    }

    try{
        const hashPassword = await bcrypt.hash(password, 10)
        return res.status(200).json({
            status: true,
            hashPassword
        })
    }catch(err){
        return res.status(500).json({
            status: false,
            err
        })
    }

    

}

module.exports = generateHashPassword