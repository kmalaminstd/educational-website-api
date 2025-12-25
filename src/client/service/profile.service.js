
const db = require("../../config/database.config")
// const upload = multer({dest: "../../../public/profile_picture"})

const changeProfilePictureService = async (picture, id) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET profile_image = ? where id = ?'
        db.query(query, [picture, id], (err, result)=> {
            if(err){
                console.log(err);
                
                reject({
                    err,
                    status: false,
                    message: "Failed to update url on profile"
                })
            }
            resolve({
                result,
                status: true,
                messag: "Pofile picture updated on profile"
            })
        })
    })
}

const allUserInformationSerivce = async (id) => {
  
      const totalCourse = await enrollCourseCountService(id)
      // console.log(totalCourse)

    return new Promise((resolve, reject) => {
        const query = 'SELECT u.id, u.name, u.email, u.role, u.country, u.bio, u.phone_number, u.profile_image, u.active, u.status, u.created_at, u.phone_number FROM users u WHERE id = ?'
        db.query(query, [id], (err, result) => {
            if(err){
              console.log(err)
                reject({
                    status: false,
                    message: "User inforamtion not found",
                    err
                })
            }
            result[0].enrolled_course = totalCourse
            // console.log(result)
            resolve({
                status: true,
                message: "User information found",
                result
            })
        })
    })
}

const enrollCourseCountService = async (id) => {
  return new Promise((resolve, reject) => {
    const countQuery = `SELECT COUNT(*) AS total_course from enrollments WHERE user_id = ?`
    db.query(countQuery, [id], (err, result) => {
      if(err){
        console.log(err)
        reject(false)
      }
      // console.log(result[0].total_course)
      resolve(result[0].total_course)
    })
  })
}

module.exports = {
    changeProfilePictureService,
    allUserInformationSerivce
}