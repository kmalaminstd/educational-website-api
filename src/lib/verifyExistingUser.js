const db = require("../config/database.config")

// verify existing user
const isExistingUser = async (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ? LIMIT 1'
        db.query(query, [email], (err, result) => {
            if(err){
                reject({
                    err,
                    status: false
                })
            }
            resolve(result)
        })
    })
}

module.exports = isExistingUser