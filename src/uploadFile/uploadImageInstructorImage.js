const multer = require("multer")
const path = require("path")
const {uid} = require("uid")

// set storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/instructor')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const filename = Date.now() + uid() + ext
        cb(null, filename)
    }
})

const uploadInstructorMulter = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedFile =  /jpg|jpeg|png|webp/
        const ext = allowedFile.test(path.extname(file.originalname).toLowerCase())
        if(ext) {
            cb(null, true)
        }else{
            cb(new Error("Only images are allowed"))
        }
    }
})

const uploadInstructorImage = async (req, res) => {
    if(!req.file){
        return res.status(401).json({
            status: false,
            message: "Invalid file"
        })
    }
    const imageurl = `${req.protocol}://${req.get('host')}/public/instructor/${req.file.filename}`
    return res.status(200).json({
        status: true,
        imageurl
    })
}

module.exports = {
    uploadInstructorMulter,
    uploadInstructorImage
}