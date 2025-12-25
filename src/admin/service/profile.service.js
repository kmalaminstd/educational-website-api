const db = require('../../config/database.config')

const profileInfoService = async () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id , name, email, created_at FROM admin LIMIT 1'
        db.query(query, [], (err, result) => {
            if(err){
                reject({
                    status: false,
                    err,
                    messag: 'Data not found'
                })
            }
            resolve({
                status: true,
                result
            })
        })
    })
}

module.exports = {
    profileInfoService
}